import express from 'express';
import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';
import ConfigApp from '../config/configapp.js';
import asyncHandler from '../middleware/asyncHandler.js';


// Config
const config = ConfigApp.get();

// Route
const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    Logger.info(`GET / - ${req.method}`);
    res.json({
        message: `مرحبًا بك في API ${config.name}`,
        version: '1.0.0',
        endpoints: {
            test: '/api/home/test'
        }
    });
}))

export default router;