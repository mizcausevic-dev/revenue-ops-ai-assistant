import type { NextFunction, Request, Response } from "express";

type AppError = Error & {
  statusCode?: number;
  code?: string;
};

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    error: {
      code: err.code || (statusCode === 404 ? "not_found" : "internal_error"),
      message: err.message || "An unexpected error occurred."
    }
  });
}
