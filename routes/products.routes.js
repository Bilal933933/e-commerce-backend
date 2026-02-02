import express from 'express';
import ProductsController from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', ProductsController.getAllProducts);
router.get('/:id', ProductsController.getProduct);
router.get('/category/:id', ProductsController.getProductsByCategory);

export default router;