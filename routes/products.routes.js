import express from 'express';
import { getProduct, getAllProducts } from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);

export default router;