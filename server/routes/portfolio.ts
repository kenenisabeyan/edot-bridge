import { Router } from 'express';
import prisma from '../../lib/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/portfolio/slug/:slug - Public view of portfolio
router.get('/slug/:slug', async (req, res) => {
  try {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
            studentProfile: true,
            certificates: {
              include: { assessment: { select: { title: true } } },
            },
          },
        },
      },
    });

    if (!portfolio || !portfolio.isPublic) {
      return res.status(404).json({ success: false, message: 'Portfolio not found or private' });
    }

    res.json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/portfolio - Upsert user portfolio
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { slug, bio, projects, isPublic } = req.body;

    if (!userId || !slug) {
      return res.status(400).json({ success: false, message: 'slug is required' });
    }

    const portfolio = await prisma.portfolio.upsert({
      where: { userId },
      create: {
        userId,
        slug,
        bio,
        projects: projects || [],
        isPublic: isPublic !== undefined ? isPublic : true,
      },
      update: {
        slug,
        bio,
        projects: projects || [],
        isPublic: isPublic !== undefined ? isPublic : true,
      },
    });

    res.json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
