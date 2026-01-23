import express from 'express';
import authMiddleware from '../middleware/verifyToken.js';
import { getUserProfile, updateUserProfile } from '../controllers/users.controller.js';

const router = express.Router();

// مسارات المستخدمين المحمية
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

export default router;