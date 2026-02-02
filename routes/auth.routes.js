import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// مسارات المصادقة

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;