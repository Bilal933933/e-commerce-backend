import Logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";


class ProductsValidator {
  // Validation methods for products would go here
  static validateCreateProduct(data) {
    if (!data.name) {
      Logger.error("الاسم مطلوب");
      throw new AppError("الاسم مطلوب", 400);
    }
    if (data.name && !data.name.trim()) {
      Logger.error("الاسم لا يمكن أن يكون فارغًا");
      throw new AppError("الاسم لا يمكن أن يكون فارغًا", 400);
    }
    if (data.name && data.name.length < 3) {
      Logger.error("الاسم يجب أن يكون 3 أحرف على الأقل");
      throw new AppError("الاسم يجب أن يكون 3 أحرف على الأقل", 400);
    }
    if (data.name && data.name.length > 100) {
      Logger.error("الاسم يجب أن لا يتجاوز 100 حرف");
      throw new AppError("الاسم يجب أن لا يتجاوز 100 حرف", 400);
    }
    if (data.price && data.price < 0) {
      Logger.error("السعر يجب أن يكون أكبر من الصفر");
      throw new AppError("السعر يجب أن يكون أكبر من الصفر", 400);
    }
    Logger.info("تم التحقق من صحة بيانات إنشاء المنتج");
  }
  static validateUpdateProduct(data) {
      if (data.name && !data.name.trim()) {
          Logger.error("الاسم لا يمكن أن يكون فارغًا");
          throw new AppError("الاسم لا يمكن أن يكون فارغًا", 400);
      }
      if (data.name && data.name.length < 3) {
          Logger.error("الاسم يجب أن يكون 3 أحرف على الأقل");
          throw new AppError("الاسم يجب أن يكون 3 أحرف على الأقل", 400);
      }
      if (data.name && data.name.length > 100) {
          Logger.error("الاسم يجب أن لا يتجاوز 100 حرف");
          throw new AppError("الاسم يجب أن لا يتجاوز 100 حرف", 400);
      }
        if (data.price && data.price < 0) {
          Logger.error("السعر يجب أن يكون أكبر من الصفر");
          throw new AppError("السعر يجب أن يكون أكبر من الصفر", 400);
      }
      Logger.info("تم التحقق من صحة بيانات تحديث المنتج");
  }
}

export default ProductsValidator;