import { Router } from 'express';
import prisma from '../../lib/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/enrollment/my-courses - Get authenticated user enrolled courses
router.get('/my-courses', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const enrollments = await prisma.enrolledCourse.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            lessons: { select: { id: true, title: true, order: true } },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });

    res.json({ success: true, data: enrollments });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/enrollment/enroll - Enroll user into a course
router.post('/enroll', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ success: false, message: 'courseId is required' });
    }

    const existing = await prisma.enrolledCourse.findFirst({
      where: { userId, courseId },
    });

    if (existing) {
      return res.json({ success: true, data: existing, message: 'Already enrolled' });
    }

    const enrollment = await prisma.enrolledCourse.create({
      data: {
        userId,
        courseId,
        progress: 0,
        completed: false,
      },
      include: { course: true },
    });

    res.status(201).json({ success: true, data: enrollment });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/enrollment/progress - Update course completion percentage
router.put('/progress', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { courseId, progress } = req.body;

    if (!userId || !courseId || typeof progress !== 'number') {
      return res.status(400).json({ success: false, message: 'courseId and valid progress percentage required' });
    }

    const isCompleted = progress >= 100;
    const updated = await prisma.enrolledCourse.updateMany({
      where: { userId, courseId },
      data: {
        progress: Math.min(100, Math.max(0, progress)),
        completed: isCompleted,
      },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
