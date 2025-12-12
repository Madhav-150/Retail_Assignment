import { User } from '@prisma/client';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'passwordHash' | 'passwordResetToken' | 'passwordResetExpires'>;
      session: import('express-session').Session & {
        userId?: string;
      };
    }
  }
}
