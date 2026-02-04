import express from 'express';
import dotenv from 'dotenv';
import Database from './config/db.js';
import ConfigApp from './config/configapp.js';
import { rateLimiterMiddleware, closeRedisConnection } from './middleware/rateLimiter.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import notFound from './routes/notFound.routes.js';
import homeRoutes from './routes/home.routes.js';
import adminRoutes from './routes/admin/index.js';
import CategoryRoutes from './routes/categories.route.js';
import ProductRoutes from './routes/products.routes.js';
import OrderRoutes from './routes/orders.routes.js';
import userSettingsRouter from './routes/userSettings.route.js';

// Middleware & Utils
import globalErrorHandler from './middleware/errorHandler.js';

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
app.use('/api/admin', adminRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/userSettings', userSettingsRouter);
app.use('/api/', rateLimiterMiddleware); // قيود السرعة

// مسار غير موجود
app.use(notFound);


// معالج الأخطاء العام (يجب أن يكون الأخير دائماً)
app.use(globalErrorHandler);

// تشغيل السيرفر
const server = app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
    console.log(`📊 البيئة: ${process.env.NODE_ENV || 'development'}`);
});

// معالجة الإيقاف الآمن
process.on('SIGTERM', async () => {
    console.log('⚠️  تم استقبال إشارة SIGTERM، جاري إغلاق الخادم...');
    server.close(async () => {
        console.log('✅ تم إغلاق الخادم');
        await closeRedisConnection();
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('⚠️  تم استقبال إشارة SIGINT، جاري إغلاق الخادم...');
    server.close(async () => {
        console.log('✅ تم إغلاق الخادم');
        await closeRedisConnection();
        process.exit(0);
    });
});