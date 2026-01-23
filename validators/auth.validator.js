import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';


class Validation {
    static validateLogin(data) {
        const { email, password } = data;
        if (!email) {
            Logger.error('البريد الإلكتروني مطلوب');
            throw new AppError('البريد الإلكتروني مطلوب', 400);
        }
        if (!password) {
            Logger.error('كلمة المرور مطلوبة');
            throw new AppError('كلمة المرور مطلوبة', 400);
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            Logger.error('البريد الإلكتروني غير صالح');
            throw new AppError('البريد الإلكتروني غير صالح', 400);
        }
        if (password && password.length < 6) {
            Logger.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            throw new AppError('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 400);
        }
        if (password && !/[A-Za-z0-9]/.test(password)) {
            Logger.error('كلمة المرور يجب أن تحتوي على أحرف');
            throw new AppError('كلمة المرور يجب أن تحتوي على أحرف', 400);
        }
    }
    static validateRegister(data) {
        const { name, email, password } = data;
        if (!name) {
            Logger.error('الاسم مطلوب');
            throw new AppError('الاسم مطلوب', 400);
        }
        if (!email) {
            Logger.error('البريد الإلكتروني مطلوب');
            throw new AppError('البريد الإلكتروني مطلوب', 400);
        }
        if (!password) {
            Logger.error('كلمة المرور مطلوبة');
            throw new AppError('كلمة المرور مطلوبة', 400);
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            Logger.error('البريد الإلكتروني غير صالح');
            throw new AppError('البريد الإلكتروني غير صالح', 400);
        }
        if (password && password.length < 6) {
            Logger.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            throw new AppError('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 400);
        }
        if (password && !/[A-Za-z0-9]/.test(password)) {
            Logger.error('كلمة المرور يجب أن تحتوي على أحرف');
            throw new AppError('كلمة المرور يجب أن تحتوي على أحرف', 400);
        }
    }

    static validateUpdate(data) {
        const { name, email, password } = data;
        if (name && name.length < 2) {
            Logger.error('الاسم يجب أن يكون 2 أحرف على الأقل');
            throw new AppError('الاسم يجب أن يكون 2 أحرف على الأقل', 400);
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            Logger.error('البريد الإلكتروني غير صالح');
            throw new AppError('البريد الإلكتروني غير صالح', 400);
        }
        if (password && password.length < 6) {
            Logger.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            throw new AppError('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 400);
        }
        if (password && !/[A-Za-z0-9]/.test(password)) {
            Logger.error('كلمة المرور يجب أن تحتوي على أحرف');
            throw new AppError('كلمة المرور يجب أن تحتوي على أحرف', 400);
        }
    }
}

export default Validation;