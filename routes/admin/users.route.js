import express from 'express';
import restrictTo from '../../middleware/restrictTo.js';
import authMiddleware from '../../middleware/verifyToken.js';
import { getAllUsers, deleteUser } from '../../controllers/users.controller.js';

const router = express.Router();

// مسارات المدير
router.get('/users', authMiddleware, restrictTo('admin'), getAllUsers);
router.delete('/:id', authMiddleware, restrictTo('admin'), deleteUser);

export default router;