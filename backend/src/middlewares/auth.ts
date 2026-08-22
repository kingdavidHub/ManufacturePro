import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user.model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../utils/jwtHelperFn';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticateUser = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in.', 401));
  }

  const decoded = verifyToken(token);

  const currentUser = await User.findOne({ email: decoded.email }).select('+password');
  if (!currentUser) {
    return next(new AppError('User belonging to this token no longer exists', 401));
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
