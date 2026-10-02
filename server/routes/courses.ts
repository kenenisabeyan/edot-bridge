import { Router } from 'express';
import prisma from '../../lib/prisma';

const router = Router();

// GET /api/courses - Fetch all active courses with lessons
router.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
        assessments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: courses });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/courses/:id - Fetch single course detail
router.get('/:id', async (req, res) => {
  try {
    const courseId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: {
          include: { translations: true },
          orderBy: { order: 'asc' },
        },
        assessments: {
          include: { questions: true },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, data: course });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
