import { Router } from 'express';
import prisma from '../../lib/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/user/profile - Get current user profile
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        studentProfile: true,
        employerProfile: true,
        portfolio: true,
        certificates: {
          include: { assessment: { select: { title: true } } },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/user/profile - Update user profile
router.put('/profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { name, image, bio, location, skills, github, linkedin } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image,
        studentProfile: {
          upsert: {
            create: { bio, location, skills: skills || [], github, linkedin },
            update: { bio, location, skills: skills || [], github, linkedin },
          },
        },
      },
      include: { studentProfile: true },
    });

    res.json({ success: true, data: updatedUser });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
