import express from 'express';
import authMiddleware from '../middleware/verifyToken.js';
import usersController from '../controllers/users.controller.js';

const router = express.Router();

// مسارات المستخدمين المحمية
router.get('/profile', authMiddleware, usersController.getUserProfile);
router.put('/profile', authMiddleware, usersController.updateUserProfile);

export default router;