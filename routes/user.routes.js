import express from 'express';
import authMiddleware from '../middleware/verifyToken.js';  // للحماية
import { getUserProfile, updateUserProfile, getAllUsers, deleteUser } from '../controllers/users.controller.js';

const router = express.Router();

// مسارات المستخدمين المحمية
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/getAllUsers', authMiddleware, getAllUsers);
router.delete('/:id', authMiddleware, deleteUser);

export default router;