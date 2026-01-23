import express from 'express';
import dotenv from 'dotenv';
import Database from './config/db.js';
import ConfigApp from './config/configapp.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notFound from './routes/notFound.js';
import homeRoutes from './routes/homeRoutes.js';

// Middleware & Utils
import globalErrorHandler from './middleware/errorHandler.js';
import AppError from './utils/AppError.js';

// تحميل المتغيرات البيئية
dotenv.config();

// الاتصال بقاعدة البيانات
Database.connect();

// تحميل الإعدادات
const config = ConfigApp.get();

// إنشاء التطبيق
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware عام
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// تسجيل الطلبات (اختياري للتطوير)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}


// API Routes
app.use('/', homeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);


// معالج الأخطاء العام (يجب أن يكون الأخير دائماً)
app.use(globalErrorHandler);

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
    console.log(`📊 البيئة: ${process.env.NODE_ENV || 'development'}`);
});