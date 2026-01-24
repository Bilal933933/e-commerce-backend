import ProductsValidator from "../validators/products.validator.js";
import validateId from "../validators/validateId.js";
import Product from "../models/product.model.js";
import generateSlug from "../utils/generateSlug.js";
import Logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

class ProductsService {

  static async createProduct(data) {
    ProductsValidator.validateCreateProduct(data);
    data.slug = generateSlug(data.name);
    const existingProduct = await Product.findOne({ slug: data.slug });
    if (existingProduct) {
      Logger.warn("محاولة إنشاء منتج مكرر بالـ slug");
      throw new AppError("المنتج موجود بالفعل", 400);
    }
    const newProduct = await Product.create(data);
    Logger.info(`تم إنشاء منتج جديد: ${newProduct._id}`);
    const productWithCategory = await Product.findById(newProduct._id)
      .populate({
        path: "categoryId",
        select: "name slug description image type"
      })
      .lean();

    return productWithCategory;
  }

  static async getAllProducts() {
    const products = await Product.find()
      .populate({
        path: "categoryId",
        select: "name slug"
      })
      .lean();

    if (!products.length) {
      Logger.info("لا توجد منتجات في النظام");
      throw new AppError("لا توجد منتجات", 404);
    }

    Logger.info(`تم جلب ${products.length} منتج`);
    return products;
  }

  static async getProduct(id) {
    validateId(id);

    const product = await Product.findById(id)
      .populate({
        path: "categoryId",
        select: "name slug description image type"
      })
      .lean();

    if (!product) {
      Logger.info("المنتج غير موجود");
      throw new AppError("المنتج غير موجود", 404);
    }

    Logger.info(`تم جلب المنتج بالمعرف: ${id}`);
    return product;
  }

  static async deleteProduct(id) {
    validateId(id);

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      Logger.info("المنتج غير موجود");
      throw new AppError("المنتج غير موجود", 404);
    }

    Logger.info(`تم حذف المنتج بالمعرف: ${id}`);
    return product;
  }

  static async updateProduct(data, id) {
    ProductsValidator.validateUpdateProduct(data);
    validateId(id);

    if (data.name) {
      data.slug = generateSlug(data.name);

      const existingProduct = await Product.findOne({
        slug: data.slug,
        _id: { $ne: id } 
      });

      if (existingProduct) {
        Logger.warn("تعارض slug مع منتج آخر");
        throw new AppError("اسم المنتج مستخدم بالفعل", 400);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    ).populate({
      path: "categoryId",
      select: "name slug description image type"
    });

    if (!updatedProduct) {
      Logger.info("المنتج غير موجود");
      throw new AppError("المنتج غير موجود", 404);
    }

    Logger.info(`تم تحديث المنتج بالمعرف: ${id}`);
    return updatedProduct;
  }
}

export default ProductsService;
