import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';
import Category from "../models/category.model.js";
import CategoryValidator from "../validators/category.validator.js";
import validateId from "../validators/validateId.js";
import generateSlug from '../utils/generateSlug.js';
import paginate from '../utils/pagination.js';
import CacheService from '../cache/cache.service.js';
import cacheKeys from '../cache/cache.keys.js';

class CategoriesService {

    // ======================
    // Get All Categories with Pagination & Cache
    // ======================
    async getAllCategories(queryParams = {}) {
        const cacheKey = cacheKeys.categories.list(queryParams);
        const cached = await CacheService.get(cacheKey);
        if (cached) {
            Logger.info('جلب جميع التصنيفات من الكاش');
            return cached;
        }

        const categories = await Category.find({}).lean();
        if (!categories || categories.length === 0) {
            Logger.error('لا يوجد تصنيفات');
            throw new AppError('لا يوجد تصنيفات', 404);
        }

        Logger.info('جلب جميع التصنيفات من DB');

        const totalItems = await Category.countDocuments({});
        const response = paginate(categories, totalItems, queryParams);

        await CacheService.set(cacheKey, response);

        return response;
    }

    // ======================
    // Get Single Category with Cache
    // ======================
    async getCategoryById(categoryId) {
        validateId(categoryId);

        const cacheKey = cacheKeys.categories.item(categoryId);
        const cached = await CacheService.get(cacheKey);
        if (cached) {
            Logger.info(`جلب التصنيف ${categoryId} من الكاش`);
            return cached;
        }

        const category = await Category.findById(categoryId).lean();
        if (!category) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }

        Logger.info(`جلب التصنيف ${categoryId} من DB`);
        await CacheService.set(cacheKey, category);

        return category;
    }

    // ======================
    // Create Category + Cache Invalidation
    // ======================
    async createCategory(categoryData) {
        CategoryValidator.validateCreate(categoryData);
        categoryData.slug = generateSlug(categoryData.name);

        const newCategory = await Category.create(categoryData);

        // ✅ Invalidate list cache
        await CacheService.del(cacheKeys.categories.list());

        Logger.info(`تم إنشاء تصنيف جديد: ${newCategory._id}`);
        return newCategory;
    }

    // ======================
    // Update Category + Cache Invalidation
    // ======================
    async updateCategory(categoryId, categoryData) {
        validateId(categoryId);
        CategoryValidator.validateUpdate(categoryData);

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            categoryData,
            { new: true }
        ).lean();

        if (!updatedCategory) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }

        // ✅ Invalidate caches
        await CacheService.del(cacheKeys.categories.list());
        await CacheService.del(cacheKeys.categories.item(categoryId));

        Logger.info(`تم تحديث التصنيف: ${categoryId}`);
        return updatedCategory;
    }

    // ======================
    // Delete Category + Cache Invalidation
    // ======================
    async deleteCategory(categoryId) {
        validateId(categoryId);

        const deletedCategory = await Category.findByIdAndDelete(categoryId).lean();
        if (!deletedCategory) {
            Logger.error('لا يوجد تصنيف');
            throw new AppError('لا يوجد تصنيف', 404);
        }

        // ✅ Invalidate caches
        await CacheService.del(cacheKeys.categories.list());
        await CacheService.del(cacheKeys.categories.item(categoryId));

        Logger.info(`تم حذف التصنيف: ${categoryId}`);
        return deletedCategory;
    }
}

export default new CategoriesService();
