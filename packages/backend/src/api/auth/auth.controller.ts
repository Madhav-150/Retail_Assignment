import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../middleware/errorHandler';
import { sendEmail } from '../../utils/email';
import { prisma } from '../../utils/prisma';

// Helper function to exclude sensitive fields from user object
const exclude = <T, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key> => {
  for (const key of keys) {
    delete user[key];
  }
  return user;
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body;

  // 1) Check if passwords match
  if (password !== passwordConfirm) {
    throw new AppError('Passwords do not match', 400);
  }

  // 2) Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  // 3) Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 4) Create user
  const newUser = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,  // Changed from passwordHash to password to match schema
    },
  });

  // 5) Save refresh token to database
  const refreshToken = uuidv4();
  await prisma.session.create({
    data: {
      userId: newUser.id,
      refreshToken,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  // 6) Remove password from output
  const userWithoutPassword = exclude(newUser, ['password']);

  // 7) Send response with user data
  res.status(201).json({
    status: 'success',
    data: {
      user: userWithoutPassword,
    },
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  // The user is attached to the request by the protect middleware
  const user = req.user;
  if (!user) {
    throw new AppError('User not authenticated', 401);
  }
  
  // Return user data (excluding sensitive fields)
  const userWithoutPassword = exclude(user, ['password']);
  
  res.status(200).json({
    status: 'success',
    data: {
      user: userWithoutPassword
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1) Check if email and password exist
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // 2) Check if user exists && password is correct
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    // 3) Check if password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      throw new AppError('Incorrect email or password', 401);
    }

    // 4) Set up session
    if (!req.session) {
      throw new AppError('Session not available', 500);
    }

    // Set session data
    req.session.userId = user.id;
    
    // Save session
    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return reject(new AppError('Error creating session', 500));
        }
        resolve();
      });
    });

    // Set cookie manually in the response
    res.cookie('connect.sid', req.sessionID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // 5) Remove password from output
    const userWithoutPassword = exclude(user, ['password']);
    
    // 6) Send response with user data
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    console.error('Login error:', error);
    throw new AppError('An error occurred during login', 500);
  }
};

export const logout = async (req: Request, res: Response) => {
  return new Promise<void>((resolve, reject) => {
    if (!req.session) {
      throw new AppError('Not authenticated', 401);
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return reject(new AppError('Error during logout', 500));
      }

      // Clear the session cookie
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      });

      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
      });
      resolve();
    });
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Token refresh is not implemented in this version',
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  // 1) Get user based on POSTed email
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    // For security reasons, don't reveal if the email exists or not
    return res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, a password reset link has been sent',
    });
  }

  // 2) Generate reset token and set expiry (1 hour)
  const resetToken = uuidv4();
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  // 3) Save the reset token to the database
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpires,
    },
  });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail(
      user.email,
      'Your password reset token (valid for 1 hour)',
      message,
      `<p>${message.replace(/\n/g, '<br>')}</p>`
    );

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    throw new AppError(
      'There was an error sending the email. Try again later!',
      500
    );
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const resetToken = req.params.token;
  const { password, passwordConfirm } = req.body;

  // 1) Check if passwords match
  if (password !== passwordConfirm) {
    throw new AppError('Passwords do not match', 400);
  }

  // 2) Find user by reset token and check if token is not expired
  const user = await prisma.user.findFirst({
    where: {
      resetToken: resetToken,
      resetTokenExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  // 3) Update user password and clear reset token
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  // 4) Create a new session
  const refreshToken = uuidv4();
  await prisma.session.create({
    data: {
      userId: user.id,
      refreshToken,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  // 5) Remove password from output
  const userWithoutPassword = exclude(user, ['password']);

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
    data: {
      user: userWithoutPassword,
    },
  });
};
