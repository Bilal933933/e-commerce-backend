import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';

class AuthService {
    static async register({ name, email, password }) {
        // Validation
        if (!name || !email || !password) {
            throw new AppError('جميع الحقول مطلوبة', 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError('البريد الإلكتروني غير صالح', 400);
        }

        if (password.length < 6) {
            throw new AppError('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 400);
        }

        // Business rule: unique email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('البريد الإلكتروني مستخدم بالفعل', 409);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        Logger.info(`مستخدم جديد: ${email}`);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }

    static async login({ email, password }) {
        // Validation
        if (!email || !password) {
            throw new AppError('جميع الحقول مطلوبة', 400);
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new AppError('البريد الإلكتروني غير صحيح', 401);
        }    

        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            throw new AppError('كلمة المرور غير صحيحة', 401);
        }
        Logger.info(`تسجيل دخول ناجح: ${email}`);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
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

export default AuthService;
