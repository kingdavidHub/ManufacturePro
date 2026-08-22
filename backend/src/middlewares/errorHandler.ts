import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import AppError from '../utils/appError';

const handleCastError = (err: mongoose.Error.CastError): AppError => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleValidationError = (err: mongoose.Error.ValidationError): AppError => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(`Validation failed: ${messages.join('. ')}`, 400);
};

const handleDuplicateKeyError = (err: any): AppError => {
  const value = err.keyValue ? JSON.stringify(err.keyValue) : 'unknown';
  return new AppError(`Duplicate field value: ${value}. Please use another value.`, 409);
};

const handleJWTError = (): AppError => {
  return new AppError('Invalid token. Please log in again.', 401);
};

const handleJWTExpiredError = (): AppError => {
  return new AppError('Token has expired. Please log in again.', 401);
};

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  let error = { ...err, message: err.message, stack: err.stack };

  console.error('Error:', error);

  // Mongoose bad ObjectId
  if (err instanceof mongoose.Error.CastError) {
    error = handleCastError(err);
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    error = handleValidationError(err);
  }

  // MongoDB duplicate key
  if (err.code === 11000 || err.name === 'MongoServerError') {
    error = handleDuplicateKeyError(err);
  }

  // JWT invalid
  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }

  // JWT expired
  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  // Known operational error
  if (err instanceof AppError || error instanceof AppError) {
    const appError = error instanceof AppError ? error : err;
    res.status(appError.statusCode).json({
      status: appError.status,
      message: appError.message,
    });
    return;
  }

  // Unknown error — don't leak internals in production
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message,
  });
};

export default errorHandler;
