import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';
import Validation from '../validators/auth.validator.js';
import UserActivityService from './userActivity.service.js';

class AuthService {
    async register(userData) {
        Validation.validateRegister(userData);

        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            Logger.error('البريد الإلكتروني مستخدم بالفعل');
            throw new AppError('البريد الإلكتروني مستخدم بالفعل', 409);
        }

        const hashedPassword = await bcrypt.hash(userData.password, 12);

        const user = await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });

        Logger.info(`مستخدم جديد: ${userData.email}`);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        await UserActivityService.logActivity({
            userId: user._id,
            action: 'تسجيل حساب جديد',
            ip: userData.ip,
            userAgent: userData.userAgent,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }

    async login(userData) {
        Validation.validateLogin(userData);

        const user = await User.findOne({ email: userData.email }).select('+password');
        if (!user) {
            Logger.error('البريد الإلكتروني غير صحيح');
            throw new AppError('البريد الإلكتروني غير صحيح', 401);
        }

        const correctPassword = await bcrypt.compare(userData.password, user.password);
        if (!correctPassword) {
            Logger.error('كلمة المرور غير صحيحة');
            throw new AppError('كلمة المرور غير صحيحة', 401);
        }
        Logger.info(`تسجيل دخول ناجح: ${userData.email}`);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        await UserActivityService.logActivity({
            userId: user._id,
            action: 'تسجيل دخول',
            ip: userData.ip,
            userAgent: userData.userAgent,
        });
        
        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
}

export default new AuthService();