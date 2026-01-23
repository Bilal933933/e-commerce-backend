import express from 'express';
const router = express.Router();

import usersRouter from './users.route.js';
// import productsRouter from './products.route.js';
// import categoriesRouter from './categories.route.js';
// import ordersRouter from './orders.route.js';

router.use('/users', usersRouter);
// router.use('/products', productsRouter);
// router.use('/categories', categoriesRouter);
// router.use('/orders', ordersRouter);

export default router;
