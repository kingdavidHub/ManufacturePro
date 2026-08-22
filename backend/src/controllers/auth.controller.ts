import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import responseHandler from '../utils/responseHandler';
import { signToken } from '../utils/jwtHelperFn';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists with this email', 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    role,
  });

  const token = signToken(newUser.email);
  res.setHeader('Authorization', `Bearer ${token}`);
  responseHandler.success(res, 201, { role: newUser.role, token });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(new AppError('Invalid email or password', 401));
  }

  const token = signToken(user.email);
  res.setHeader('Authorization', `Bearer ${token}`);
  responseHandler.success(res, 200, { role: user.role, token });
});

export const logout = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  res.setHeader('Authorization', '');
  responseHandler.success(res, 200, { message: 'Logged out successfully' });
});
