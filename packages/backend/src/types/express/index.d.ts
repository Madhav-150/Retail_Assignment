import { User } from '@prisma/client';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password' | 'resetToken' | 'resetTokenExpires'>;
      session: import('express-session').Session & {
        userId?: number;
      };
    }
  }
}
