import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';
import Category from "../models/category.model.js";
import CategoryValidator from "../validators/category.validator.js";
import validateId from "../validators/validateId.js";
import generateSlug from '../utils/generateSlug.js';


class CategoriesService {

    async getAllCategories(query) {
        const categories = await Category.find(query);
        if (categories.length === 0 || !categories) {
            Logger.error('لا يوجد تصنيفات');
            throw new AppError('لا يوجد تصنيفات', 404);
        }
        Logger.info('جلب جميع التصنيفات');
        return categories;
    }

    async getCategoryById(categoryId) {
        validateId(categoryId);
        const category = await Category.findById(categoryId);
        if (!category) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }
        return category;
    }

    async createCategory(categoryData) {
        CategoryValidator.validateCreate(categoryData);
        categoryData.slug = generateSlug(categoryData.name);
        return await Category.create(categoryData);
    }

    async updateCategory(categoryId, categoryData) {
        validateId(categoryId);
        CategoryValidator.validateUpdate(categoryData);
        const category = await Category.findByIdAndUpdate(
            categoryId,
            categoryData,
            { new: true }
        );
        if (!category) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }
        return category;
    }

    async deleteCategory(categoryId) {
        validateId(categoryId);
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }
        return category;
    }
}

export default new CategoriesService();
