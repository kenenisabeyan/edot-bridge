import { Router } from 'express';
import prisma from '../../lib/prisma';

const router = Router();

// GET /api/jobs - List active job postings
router.get('/', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      include: {
        employer: {
          select: { companyName: true, companyLogo: true, location: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: jobs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/jobs/apply - Submit job application
router.post('/apply', async (req, res) => {
  try {
    const { jobId, userId, coverLetter } = req.body;

    if (!jobId || !userId) {
      return res.status(400).json({ success: false, message: 'jobId and userId are required' });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        userId,
        coverLetter,
        status: 'PENDING',
      },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
