import { Router } from 'express';
import prisma from '../../lib/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// POST /api/employer/jobs - Create a new job posting
router.post('/jobs', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { title, description, location, type, requiredSkills, experienceMin, salaryMin, salaryMax } = req.body;

    if (!userId || !title || !description) {
      return res.status(400).json({ success: false, message: 'title and description are required' });
    }

    let employerProfile = await prisma.employerProfile.findUnique({ where: { userId } });
    if (!employerProfile) {
      employerProfile = await prisma.employerProfile.create({
        data: {
          userId,
          companyName: req.user?.email ? req.user.email.split('@')[0] : 'Company',
        },
      });
    }

    const job = await prisma.job.create({
      data: {
        employerId: employerProfile.id,
        title,
        description,
        location,
        type: type || 'FULL_TIME',
        requiredSkills: requiredSkills || [],
        experienceMin: experienceMin ? parseInt(experienceMin) : null,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryMax: salaryMax ? parseInt(salaryMax) : null,
      },
    });

    res.status(201).json({ success: true, data: job });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/employer/applications - View candidates applying for employer jobs
router.get('/applications', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const employerProfile = await prisma.employerProfile.findUnique({ where: { userId } });

    if (!employerProfile) {
      return res.status(404).json({ success: false, message: 'Employer profile not found' });
    }

    const applications = await prisma.jobApplication.findMany({
      where: {
        job: { employerId: employerProfile.id },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            studentProfile: true,
            portfolio: { select: { slug: true } },
          },
        },
        job: { select: { id: true, title: true } },
      },
      orderBy: { appliedAt: 'desc' },
    });

    res.json({ success: true, data: applications });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/employer/applications/:id - Update candidate application status (SHORTLISTED, HIRED, REJECTED)
router.put('/applications/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const applicationId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { status } = req.body;

    const updated = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
