import CategoriesService from "../services/categories.service.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await CategoriesService.getAllCategories();
    res.status(200).json({ status: "success", data: categories });
});

const getCategoryById = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await CategoriesService.getCategoryById(categoryId);
    res.status(200).json({ status: "success", data: category });
});

const createCategory = asyncHandler(async (req, res, next) => {
    const categoryData = req.body;
    const newCategory = await CategoriesService.createCategory(categoryData);
    res.status(201).json({ status: "success", data: newCategory });
});

const updateCategory = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id;
    const categoryData = req.body;
    const updatedCategory = await CategoriesService.updateCategory(categoryId, categoryData);
    res.status(200).json({ status: "success", data: updatedCategory });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id;
    const deletedCategory = await CategoriesService.deleteCategory(categoryId);
    res.status(200).json({ status: "success", data: deletedCategory });
});

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };