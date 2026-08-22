import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import catchAsync from '../utils/catchAsync';
import { authenticateUser } from '../middlewares/auth';
import validate from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validations';

const router = Router();

router.post('/register', validate(registerSchema), catchAsync(authController.register));
router.post('/login', validate(loginSchema), catchAsync(authController.login));
router.get('/logout', authenticateUser, catchAsync(authController.logout));

export default router;
