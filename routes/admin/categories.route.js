import express from 'express';
import { getAllCategories , getCategoryById, createCategory, updateCategory, deleteCategory } from '../../controllers/category.controller.js';
import authMiddleware from '../../middleware/verifyToken.js';
import restrictTo from '../../middleware/restrictTo.js';

const router = express.Router();

router.route('/').get(getAllCategories).post(authMiddleware, restrictTo('admin'), createCategory);
router.route('/:id').get(getCategoryById).put(authMiddleware, restrictTo('admin'), updateCategory).delete(authMiddleware, restrictTo('admin'), deleteCategory);

export default router;