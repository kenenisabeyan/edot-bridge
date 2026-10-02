import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from '../lib/prisma';

import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import jobRoutes from './routes/jobs';
import assessmentRoutes from './routes/assessments';
import certificateRoutes from './routes/certificates';
import userRoutes from './routes/user';
import enrollmentRoutes from './routes/enrollment';
import portfolioRoutes from './routes/portfolio';
import employerRoutes from './routes/employer';
import matchJobsRoutes from './routes/match-jobs';
import translateRoutes from './routes/translate';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/user', userRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/match-jobs', matchJobsRoutes);
app.use('/api/translate', translateRoutes);

// Detailed Health check & Server Metrics endpoint
app.get('/api/health', async (req, res) => {
  const startTime = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - startTime;

    res.json({
      status: 'ok',
      stack: 'PERN (PostgreSQL, Express, React, Node)',
      totalModules: 11,
      database: {
        provider: 'PostgreSQL',
        status: 'connected',
        queryLatencyMs: dbLatency,
      },
      system: {
        uptimeSeconds: Math.floor(process.uptime()),
        memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
      modules: [
        'auth',
        'courses',
        'jobs',
        'assessments',
        'certificates',
        'user',
        'enrollment',
        'portfolio',
        'employer',
        'match-jobs',
        'translate',
      ],
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start Express Server
app.listen(PORT, () => {
  console.log(`[PERN Stack Express Backend] Server running on http://localhost:${PORT}`);
});

export { app, prisma };
