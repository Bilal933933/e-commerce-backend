import express from 'express';

import authMiddleware from '../../middleware/verifyToken.js';
import restrictTo from '../../middleware/restrictTo.js';
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../../controllers/products.controller.js';

const router = express.Router();

router.use(authMiddleware);
router.use(restrictTo('admin'));

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;