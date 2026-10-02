import { Router } from 'express';
import prisma from '../../lib/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/match-jobs - Match active jobs based on authenticated user's skills
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true, certificates: true },
    });

    if (!user || !user.studentProfile) {
      return res.json({ success: true, data: [] });
    }

    const userSkills = user.studentProfile.skills || [];
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      include: {
        employer: {
          select: { companyName: true, companyLogo: true, location: true },
        },
      },
    });

    const matchedJobs = jobs
      .map((job) => {
        const required = job.requiredSkills || [];
        const matchedSkills = userSkills.filter((skill) =>
          required.some((r) => r.toLowerCase() === skill.toLowerCase())
        );
        const matchScore = required.length ? Math.round((matchedSkills.length / required.length) * 100) : 0;
        return {
          ...job,
          matchScore,
          matchedSkills,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json({ success: true, data: matchedJobs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
