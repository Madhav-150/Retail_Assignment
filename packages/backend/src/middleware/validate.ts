import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodSchema } from 'zod';
import AppError from './errorHandler';

type SchemaType = z.ZodSchema | z.ZodEffects<z.ZodSchema>;

export const validate = (schema: SchemaType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Raw request body:', req.body); // Debug log

      // Create a copy of the data to avoid mutating the original
      const data = {
        body: req.body || {},
        query: req.query || {},
        params: req.params || {},
      };

      // Log the data being validated
      console.log('Data being validated:', JSON.stringify(data, null, 2));

      // Try to parse the data
      try {
        await schema.parseAsync(data.body);
        return next();
      } catch (e) {
        if (e instanceof ZodError) {
          console.error('Validation error details:', e.errors); // Debug log
          const errorMessages = e.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          }));
          return next(
            new AppError('Validation failed', 400, {
              errors: errorMessages,
            })
          );
        }
        throw e;
      }
    } catch (error) {
      console.error('Unexpected error in validation middleware:', error); // Debug log
      next(error);
    }
  };
};