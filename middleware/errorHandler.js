import Logger from "../utils/logger.js";

const globalErrorHandler = (err, req, res, next) => {
    // تعيين القيم الافتراضية
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // تسجيل الخطأ مع تفاصيل إضافية
    Logger.error(`${err.message} - ${req.method} ${req.path}`);
    
    // في بيئة التطوير: سجّل الـ stack trace
    if (process.env.NODE_ENV === 'development') {
        console.error('Stack trace:', err.stack);
    }

    // بناء الاستجابة
    const errorResponse = {
        status: err.status,
        message: err.message,
    };

    // في بيئة التطوير: أضف معلومات إضافية
    if (process.env.NODE_ENV === 'development') {
        errorResponse.error = err;
        errorResponse.stack = err.stack;
    }

    // في الإنتاج: لا تُظهر تفاصيل الأخطاء التقنية للمستخدم
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        errorResponse.message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
    }

    res.status(err.statusCode).json(errorResponse);
};

export default globalErrorHandler;