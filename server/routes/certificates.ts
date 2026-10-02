import { Router } from 'express';
import prisma from '../../lib/prisma';

const router = Router();

// GET /api/certificates/verify/:verificationId - Public certificate verification
router.get('/verify/:verificationId', async (req, res) => {
  try {
    const verificationId = Array.isArray(req.params.verificationId)
      ? req.params.verificationId[0]
      : req.params.verificationId;

    const certificate = await prisma.certificate.findUnique({
      where: { verificationId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        assessment: { select: { id: true, title: true } },
      },
    });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate invalid or not found' });
    }

    res.json({ success: true, data: certificate });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
