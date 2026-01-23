import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from './asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // قراءة الـ Token من Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new AppError('غير مسموح: يجب تسجيل الدخول أولاً', 401);
    }

    // التحقق من Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // التحقق من وجود المستخدم
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new AppError('المستخدم غير موجود', 401);
    }

    // حفظ بيانات المستخدم في request
    req.user = user;

    next(); // السماح بالوصول للمسار التالي
});

export default protect;
