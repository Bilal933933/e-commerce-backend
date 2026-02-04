import express from 'express';
import authMiddleware from '../../middleware/verifyToken.js';
import restrictTo from '../../middleware/restrictTo.js';
import { getDashboardLimiter } from '../../middleware/rateLimiter.js';
import DashboardController from '../../controllers/dashboard.controller.js';

const router = express.Router();
const dashboardLimiter = getDashboardLimiter();

// تطبيق Rate Limiter على جميع Dashboard Endpoints
router.use(dashboardLimiter);

router.get('/overall-summary', authMiddleware, restrictTo('admin'), DashboardController.getOverallSummary);
router.get('/users-summary', authMiddleware, restrictTo('admin'), DashboardController.getUsersSummary);
router.get('/orders-summary', authMiddleware, restrictTo('admin'), DashboardController.getOrdersSummary);
router.get('/settings-summary', authMiddleware, restrictTo('admin'), DashboardController.getSettingsSummary);
router.get('/products-summary', authMiddleware, restrictTo('admin'), DashboardController.getProductsSummary);

export default router;
