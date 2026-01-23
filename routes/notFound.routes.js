import express from 'express';
import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';
const router = express.Router();

// معالجة المسارات غير الموجودة (404)
router.use((req, res, next) => {
    Logger.info(`404 Not Found: ${req.originalUrl} - ${req.method}`);
    next(new AppError(`لا يمكن العثور على ${req.originalUrl} على هذا السيرفر`, 404));
});

export default router;