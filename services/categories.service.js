import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';
import Category from "../models/category.model.js";
import CategoryValidator from "../validators/category.validator.js";
import validateId from "../validators/validateId.js";
import generateSlug from '../utils/generateSlug.js';

class CategoriesService {
    static async getAllCategories() {
        // get all categories from db
        const categories = await Category.find();
        if (categories.length === 0) {
            Logger.error('لا يوجد تصنيفات');
            throw new AppError('لا يوجد تصنيفات', 404);
        }
        Logger.info('جلب جميع التصنيفات');
        return categories;
    }

    static async getCategoryById(categoryId) {
        // get category by id from db
        validateId(categoryId);
        const category = await Category.findById(categoryId);
        if (!category) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }
        Logger.info('جلب تصنيف');
        return category;
    }

    static async createCategory(categoryData) {
        CategoryValidator.validateCreate(categoryData);
        categoryData.slug = generateSlug(categoryData.name);
        let newCategory = await Category.create(categoryData);
        Logger.info('إنشاء تصنيف جديد');
        return newCategory;
    }

    static async updateCategory(categoryId, categoryData) {
        // update category in db
        validateId(categoryId);
        CategoryValidator.validateUpdate(categoryData);
        let categories = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
        if (!categories) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }
        categories = await categories.save();
        Logger.info('تحديث تصنيف');
        return categories;
    }

    static async deleteCategory(categoryId) {
        // delete category from db
        validateId(categoryId);
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }
        Logger.info('حذف تصنيف');
        return category;
    }
}

export default CategoriesService;