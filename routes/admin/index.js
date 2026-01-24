import express from 'express';
const router = express.Router();

import usersRouter from './users.route.js';
import productsRouter from './products.route.js';
import categoriesRouter from './categories.route.js';
// import ordersRouter from './orders.route.js';

router.use('/user', usersRouter);
router.use('/product', productsRouter);
router.use('/category', categoriesRouter);
// router.use('/orders', ordersRouter);

export default router;
