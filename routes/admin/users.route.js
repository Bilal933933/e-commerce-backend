import express from 'express';
import restrictTo from '../../middleware/restrictTo.js';
import authMiddleware from '../../middleware/verifyToken.js';
import usersController from '../../controllers/users.controller.js';

const router = express.Router();

// مسارات المدير
router.get('/users', authMiddleware, restrictTo('superAdmin', 'admin'),usersController.getAllUsers);
router.get('/users/admins', authMiddleware, restrictTo('superAdmin'),usersController.getAllAdmins);
router.get('/users/clients', authMiddleware, restrictTo('superAdmin', 'admin'),usersController.getAllClients);
router.put('/role/:userId', authMiddleware, restrictTo('superAdmin'), usersController.updateUserRole);
router.put('/block/:id', authMiddleware, restrictTo('superAdmin', 'admin'), usersController.blockUser);
router.put('/unblock/:id', authMiddleware, restrictTo('superAdmin', 'admin'), usersController.unblockUser);

export default router;