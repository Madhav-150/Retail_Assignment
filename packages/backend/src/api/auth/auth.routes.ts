import { Router } from 'express';
import { signup, login, logout, forgotPassword, resetPassword, getCurrentUser } from './auth.controller';
import { validate } from '../../middleware/validate';
import { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation';
import { protect } from '../../middleware/auth';

const router = Router();

// Public routes
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.post('/logout', logout);

export default router;
