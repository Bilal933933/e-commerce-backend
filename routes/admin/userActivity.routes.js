import express from 'express';
import userActivityController from "../../controllers/userActivity.controller.js";
import authMiddleware from '../../middleware/verifyToken.js';
import restrictTo from '../../middleware/restrictTo.js';

const router = express.Router();

router.get('/:id', authMiddleware, restrictTo('superAdmin', 'admin'), userActivityController.getUserActivities);

export default router;