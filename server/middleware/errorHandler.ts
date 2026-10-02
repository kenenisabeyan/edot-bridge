import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[PERN Error Handler] ${req.method} ${req.url} - Code: ${err.code || 'UNKNOWN'} - ${message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: err.code || 'INTERNAL_ERROR',
      statusCode,
      path: req.url,
      timestamp: new Date().toISOString(),
    },
  });
};
