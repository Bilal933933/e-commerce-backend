import Logger from "../utils/logger.js";

const globalErrorHandler = (err, req, res, next) => {
    // تعيين القيم الافتراضية
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // تسجيل الخطأ مع تفاصيل إضافية (للـ logs فقط)
    const errorLog = `[${err.statusCode}] ${err.message} - ${req.method} ${req.path}`;
    Logger.error(errorLog);
    
    // في بيئة التطوير: سجّل الـ stack trace في السجلات فقط
    if (process.env.NODE_ENV === 'development') {
        // console.error('🔴 Stack Trace:', err.stack);
        console.error(errorLog);
    }

    // بناء الاستجابة - رسالة مختصرة فقط
    const errorResponse = {
        status: err.status,
        message: err.message,
    };

    // في الإنتاج: لا تُظهر تفاصيل الأخطاء التقنية للمستخدم
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        errorResponse.message = 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً';
    }

    res.status(err.statusCode).json(errorResponse);
};

export default globalErrorHandler;