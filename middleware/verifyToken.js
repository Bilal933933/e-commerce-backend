import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from './asyncHandler.js';
import Logger from '../utils/logger.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    Logger.warn('توكن غير موجود');
    throw new AppError('غير مسموح: يجب تسجيل الدخول أولاً', 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {

    // 🔴 انتهت صلاحية التوكن
    if (error.name === 'TokenExpiredError') {
      Logger.warn('انتهت صلاحية التوكن');
      throw new AppError('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى', 401);
    }

    // 🔴 توكن غير صالح
    Logger.error('توكن غير صالح');
    throw new AppError('توكن غير صالح، يرجى تسجيل الدخول مرة أخرى', 401);
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    Logger.warn('المستخدم غير موجود للتوكن المقدم');
    throw new AppError('المستخدم غير موجود', 401);
  }

  req.user = user;
  next();
});

export default protect;