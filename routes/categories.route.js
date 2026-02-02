import express from 'express';
// import { getAllCategories, getCategoryById } from '../controllers/category.controller.js';
import CategoriesController from '../controllers/category.controller.js';

const router = express.Router();


router.get('/', CategoriesController.getAllCategories);
router.get('/:id', CategoriesController.getCategoryById);

export default router;