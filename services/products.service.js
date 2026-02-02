import ProductsValidator from "../validators/products.validator.js";
import validateId from "../validators/validateId.js";
import Product from "../models/product.model.js";
import generateSlug from "../utils/generateSlug.js";
import Logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";
import APIFeatures from "../utils/apiFeatures.js";
import paginate from "../utils/pagination.js";

class ProductsService {

    // ======================
    // Create Product
    // ======================
    async createProduct(data) {
        ProductsValidator.validateCreateProduct(data);

        data.slug = generateSlug(data.name);

        const existingProduct = await Product.findOne({ slug: data.slug });
        if (existingProduct) {
            Logger.warn("محاولة إنشاء منتج مكرر");
            throw new AppError("المنتج موجود بالفعل", 400);
        }

        if (data.categoryId) {
            validateId(data.categoryId);
        }

        const newProduct = await Product.create(data);

        Logger.info(`تم إنشاء منتج جديد: ${newProduct._id}`);

        return await Product.findById(newProduct._id)
            .populate({
                path: "categoryId",
                select: "name slug description image type",
            })
            .lean();
    }

    // ======================
    // Get All Products
    // ======================
    async getAllProducts(queryParams) {
        const baseQuery = Product.find({ isDeleted: false })
            .populate({
                path: "categoryId",
                select: "name slug",
            });

        const features = new APIFeatures(baseQuery, queryParams)
            .filter()
            .search("name")
            .sort()
            .paginate();

        const products = await features.query.lean();

        // إزالة 404 عند قائمة فارغة → نرجع Array فاضي
        if (!products.length) {
            Logger.warn("لا توجد منتجات");
        } else {
            Logger.info(`تم جلب ${products.length} منتج`);
        }

        const totalItems = await Product.countDocuments({ isDeleted: false });

        // ✅ هنا نرجع Response موحد باستخدام paginate
        return paginate(products, totalItems, queryParams);
    }

    // ======================
    // Get Products By Category
    // ======================
    async getProductsByCategory(categoryId, queryParams) {
        validateId(categoryId);

        const baseQuery = Product.find({
            categoryId,
            isDeleted: false,
        }).populate({
            path: "categoryId",
            select: "name slug",
        });

        const features = new APIFeatures(baseQuery, queryParams)
            .filter()
            .search("name")
            .sort()
            .paginate();

        const products = await features.query.lean();

        if (!products.length) {
            Logger.warn("لا توجد منتجات في هذا التصنيف");
            throw new AppError("لا توجد منتجات في هذا التصنيف", 404);
        }
        Logger.info(`تم جلب ${products.length} منتج من التصنيف ${categoryId}`);

        const totalItems = await Product.countDocuments({
            categoryId,
            isDeleted: false,
        });
        
        return paginate(products, totalItems, queryParams);
    }

    // ======================
    // Get Single Product
    // ======================
    async getProduct(id) {
        validateId(id);

        const product = await Product.findOne({
            _id: id,
            isDeleted: false,
        })
            .populate({
                path: "categoryId",
                select: "name slug description image type",
            })
            .lean();

        if (!product) {
            Logger.warn("المنتج غير موجود");
            throw new AppError("المنتج غير موجود", 404);
        }

        return product;
    }

    // ======================
    // Update Product
    // ======================
    async updateProduct(data, id) {
        ProductsValidator.validateUpdateProduct(data);
        validateId(id);

        if (data.name) {
            data.slug = generateSlug(data.name);

            const existingProduct = await Product.findOne({
                slug: data.slug,
                _id: { $ne: id },
            });

            if (existingProduct) {
                Logger.warn("تعارض slug مع منتج آخر");
                throw new AppError("اسم المنتج مستخدم بالفعل", 400);
            }
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id, isDeleted: false },
            data,
            { new: true, runValidators: true }
        )
            .populate({
                path: "categoryId",
                select: "name slug description image type",
            })
            .lean();

        if (!updatedProduct) {
            Logger.warn("المنتج غير موجود");
            throw new AppError("المنتج غير موجود", 404);
        }

        Logger.info(`تم تحديث المنتج: ${id}`);

        return updatedProduct;
    }

    // ======================
    // Soft Delete Product
    // ======================
    async deleteProduct(id) {
        validateId(id);

        const product = await Product.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (!product) {
            Logger.warn("المنتج غير موجود");
            throw new AppError("المنتج غير موجود", 404);
        }

        Logger.info(`تم حذف المنتج (Soft Delete): ${id}`);

        return product;
    }
}

export default new ProductsService();
