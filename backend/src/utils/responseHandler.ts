import { Response } from 'express';
import AppError from './appError';

const responseHandler = {
  success: (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({
      status: 'success',
      data,
    });
  },
  error: (res: Response, error: AppError) => {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
    });
  },
};

export default responseHandler;
