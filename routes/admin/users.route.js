import express from 'express';
import restrictTo from '../../middleware/restrictTo.js';
import authMiddleware from '../../middleware/verifyToken.js';
import usersController from '../../controllers/users.controller.js';

const router = express.Router();

// مسارات المدير
router.get('/users', authMiddleware, restrictTo('admin'),usersController.getAllUsers);
router.delete('/:id', authMiddleware, restrictTo('admin'), usersController.deleteUser);

export default router;