import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import AppError from './errorHandler';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Consider creating a proper User type
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if session exists and has userId
    if (!req.session) {
      console.log('No session found');
      return next(new AppError('Session not initialized. Please log in again.', 401));
    }

    if (!req.session.userId) {
      console.log('No userId in session');
      return next(new AppError('You are not logged in. Please log in to get access.', 401));
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        passwordHash: false
      }
    });

    if (!user) {
      // If user not found in DB but session exists, clear the session
      if (req.session) {
        req.session.destroy(() => {
          res.clearCookie('connect.sid');
        });
      }
      return next(new AppError('The user no longer exists. Please log in again.', 401));
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
