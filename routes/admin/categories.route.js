import express from 'express';
import authMiddleware from '../../middleware/verifyToken.js';
import CategoriesController from '../../controllers/category.controller.js';
import restrictTo from '../../middleware/restrictTo.js';

const router = express.Router();

router.route('/').get(CategoriesController.getAllCategories).post(authMiddleware, restrictTo('admin'), CategoriesController.createCategory);
router.route('/:id').get(CategoriesController.getCategoryById).put(authMiddleware, restrictTo('admin'), CategoriesController.updateCategory).delete(authMiddleware, restrictTo('admin'), CategoriesController.deleteCategory);

export default router;