import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../utils/prisma';
import AppError from '../../middleware/errorHandler';

// @desc    Get user settings
// @route   GET /api/settings
// @access  Private
export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return next(new AppError('User not authenticated', 401));
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                email: true,
                settings: true
            }
        });

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        let settings = {};
        if (user.settings) {
            try {
                settings = JSON.parse(user.settings);
            } catch (e) {
                console.error('Error parsing settings JSON', e);
            }
        }

        // Merge user profile data with settings
        const responseData = {
            name: user.name,
            email: user.email,
            ...settings
        };

        res.status(200).json({
            status: 'success',
            data: {
                settings: responseData
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user settings
// @route   PUT /api/settings
// @access  Private
export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { name, email, ...otherSettings } = req.body;

        if (!userId) {
            return next(new AppError('User not authenticated', 401));
        }

        // Update User table columns (name, email) and settings JSON
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name,
                email: email,
                settings: JSON.stringify(otherSettings)
            },
            select: {
                name: true,
                email: true,
                settings: true
            }
        });

        const responseData = {
            name: updatedUser.name,
            email: updatedUser.email,
            ...JSON.parse(updatedUser.settings || '{}')
        };

        res.status(200).json({
            status: 'success',
            data: {
                settings: responseData
            }
        });
    } catch (error) {
        next(error);
    }
};
