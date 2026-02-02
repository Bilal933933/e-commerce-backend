import express from 'express';
import productsController from '../../controllers/products.controller.js';
import authMiddleware from '../../middleware/verifyToken.js';
import restrictTo from '../../middleware/restrictTo.js';

const router = express.Router();

router.use(authMiddleware);
router.use(restrictTo('admin'));

router.route('/').get(productsController.getAllProducts).post(productsController.createProduct);
router.route('/:id').get(productsController.getProduct).put(productsController.updateProduct).delete(productsController.deleteProduct);

export default router;