import Logger from '../utils/logger.js';
import AppError from '../utils/AppError.js';

class CategoryValidator {
    static validateCreate(data) {
        if (!data.name) {
            throw new AppError("الاسم مطلوب");
        }
        if (data.name && !data.name.trim()) {
            throw new AppError("الاسم لا يمكن أن يكون فارغًا");
        }
        if (data.name && data.name.length < 3) {
            throw new AppError("الاسم يجب أن يكون 3 أحرف على الأقل");
        }
        if (!data.description) {
            throw new AppError("الوصف مطلوب");
        }
        if (data.description && !data.description.trim()) {
            throw new AppError("الوصف لا يمكن أن يكون فارغًا");
        }
        if (data.description && data.description.length < 10) {
            throw new AppError("الوصف يجب أن يكون 10 أحرف على الأقل");
        }
        if (!data.image) {
            throw new AppError("صورة التصنيف مطلوبة");
        }
        if (data.image && !data.image.trim()) {
            throw new AppError("صورة التصنيف لا يمكن أن تكون فارغة");
        }
        Logger.info('التحقق من صحة بيانات إنشاء التصنيف');
    }

    static validateUpdate(data) {
        if (data.name && !data.name.trim()) {
            throw new AppError("الاسم لا يمكن أن يكون فارغًا");
        }
        if (data.name && data.name.length < 3) {
            throw new AppError("الاسم يجب أن يكون 3 أحرف على الأقل");
        }
        if (data.description && !data.description.trim()) {
            throw new AppError("الوصف لا يمكن أن يكون فارغًا");
        }
        if (data.description && data.description.length < 10) {
            throw new AppError("الوصف يجب أن يكون 10 أحرف على الأقل");
        }
        if (data.image && !data.image.trim()) {
            throw new AppError("صورة التصنيف لا يمكن أن تكون فارغة");
        }
        Logger.info('التحقق من صحة بيانات تحديث التصنيف');
    }
}

export default CategoryValidator;