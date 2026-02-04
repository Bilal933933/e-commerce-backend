import express from 'express';
const router = express.Router();

import usersRouter from './users.route.js';
import productsRouter from './products.route.js';
import categoriesRouter from './categories.route.js';
import dashboardRouter from './dashboard.routes.js';
import userActivityRouter from './userActivity.routes.js';


router.use('/user', usersRouter);
router.use('/product', productsRouter);
router.use('/category', categoriesRouter);
router.use('/dashboard', dashboardRouter);
router.use('/user-activity', userActivityRouter);


export default router;
