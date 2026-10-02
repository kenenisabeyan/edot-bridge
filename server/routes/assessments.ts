import { Router } from 'express';
import prisma from '../../lib/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/assessments/:id - Fetch assessment details with questions
router.get('/:id', async (req, res) => {
  try {
    const assessmentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!assessment) {
      return res.status(404).json({ success: false, message: 'Assessment not found' });
    }

    res.json({ success: true, data: assessment });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/assessments/:id/submit - Submit assessment answers & generate result/certificate
router.post('/:id/submit', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const assessmentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const userId = req.user?.id;
    const { answers } = req.body || {};

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User unauthorized' });
    }

    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: { questions: true },
    });

    if (!assessment) {
      return res.status(404).json({ success: false, message: 'Assessment not found' });
    }

    // Grade assessment
    let earnedPoints = 0;
    let totalPoints = 0;

    if (assessment.questions) {
      assessment.questions.forEach((q: any) => {
        totalPoints += q.points;
        const selectedOption = answers ? answers[q.id] : undefined;
        const options = q.options as any;

        if (options && options.correctAnswer && selectedOption === options.correctAnswer) {
          earnedPoints += q.points;
        }
      });
    }

    const scorePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = scorePercentage >= assessment.passingScore;

    // Save assessment result in PostgreSQL
    const result = await prisma.assessmentResult.create({
      data: {
        userId,
        assessmentId,
        score: scorePercentage,
        passed,
        skillsTagged: ['JavaScript', 'React', 'Problem Solving'],
      },
    });

    let certificate = null;
    if (passed) {
      const verificationId = `CERT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      certificate = await prisma.certificate.create({
        data: {
          userId,
          assessmentId,
          verificationId,
          certificateUrl: `/certificates/${verificationId}`,
        },
      });
    }

    res.status(201).json({
      success: true,
      data: {
        result,
        certificate,
        scorePercentage,
        passed,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
