import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import AppError from '../utils/appError';

const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const messages = result.error.issues.map((issue) => {
        const path = issue.path.join('.');
        return `${path ? path + ': ' : ''}${issue.message}`;
      });
      return next(new AppError(`Validation failed: ${messages.join('; ')}`, 400));
    }

    next();
  };
};

export default validate;
