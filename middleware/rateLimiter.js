import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import Logger from '../utils/logger.js';

let rateLimiter = null;
let redisClient = null;
let isRedisAvailable = false;

// محاولة الاتصال بـ Redis (اختياري)
const initializeRedis = async () => {
  try {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      enableOfflineQueue: false,
      retryStrategy: () => null, // إيقاف المحاولة بعد أول فشل
      maxRetriesPerRequest: 1,
      connectTimeout: 3000, // انتظر 3 ثواني فقط
    });

    // معالجة أخطاء الاتصال بدون رفع استثناء
    redisClient.on('error', (err) => {
      Logger.warn(`⚠️ Redis connection error: ${err.message}`);
      isRedisAvailable = false;
    });

    redisClient.on('connect', () => {
      Logger.info('✅ Redis متصل بنجاح');
      isRedisAvailable = true;
    });

    // اختبار الاتصال
    await redisClient.ping();
    isRedisAvailable = true;

    // إعداد Rate Limiter مع Redis
    rateLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'rateLimiter',
      points: 100,             // الحد الأقصى للطلبات
      duration: 60 * 60,       // كل ساعة (3600 ثانية)
      blockDuration: 60 * 15,  // حظر 15 دقيقة بعد تجاوز الحد
    });

    Logger.info('🚀 Rate Limiter (Redis) جاهز');
  } catch (err) {
    Logger.warn(`⚠️ لم يتمكن من الاتصال بـ Redis: ${err.message}`);
    Logger.info('📌 سيتم استخدام Rate Limiter في الذاكرة (Memory) بدلاً منه');
    initializeMemoryLimiter();
  }
};

// Rate Limiter بالذاكرة (fallback)
const initializeMemoryLimiter = () => {
  rateLimiter = new RateLimiterMemory({
    points: 100,             // الحد الأقصى للطلبات
    duration: 60 * 60,       // كل ساعة
    blockDuration: 60 * 15,  // حظر 15 دقيقة
  });

  Logger.info('✅ Rate Limiter (Memory) جاهز');
};

// البدء بالتهيئة عند استيراد الملف
initializeRedis();

// Middleware - معالجة الطلبات
export const rateLimiterMiddleware = async (req, res, next) => {
  try {
    if (!rateLimiter) {
      Logger.error('❌ Rate Limiter لم يتم تهيئته بعد');
      return next();
    }

    // تحديد المفتاح بناءً على المستخدم أو عنوان IP
    const key = req.user?.id || req.ip;

    try {
      await rateLimiter.consume(key);
      next(); // السماح بالطلب
    } catch (err) {
      // تجاوز الحد المسموح
      if (err.isFirstInDuration !== undefined) {
        // RateLimiter error
        const retrySecs = Math.round(err.msBeforeNext / 1000) || 1;

        Logger.warn(
          `⚠️ تجاوز حد الطلبات: IP=${req.ip}, User=${req.user?.id || 'Guest'}, Retry=${retrySecs}s`
        );

        res.set('Retry-After', String(retrySecs));
        return res.status(429).json({
          status: 'error',
          message: 'لقد تجاوزت الحد المسموح به من الطلبات',
          retryAfter: retrySecs,
          timestamp: new Date().toISOString(),
        });
      } else {
        // خطأ آخر
        throw err;
      }
    }
  } catch (error) {
    Logger.error(`❌ خطأ في Rate Limiter: ${error.message}`);
    // تجاوز Rate Limiter عند الخطأ - السماح بالطلب
    next();
  }
};

// تنظيف الموارد عند إيقاف التطبيق
export const closeRedisConnection = async () => {
  if (redisClient && isRedisAvailable) {
    try {
      await redisClient.quit();
      Logger.info('✅ تم إغلاق اتصال Redis');
    } catch (err) {
      Logger.error(`❌ خطأ في إغلاق Redis: ${err.message}`);
    }
  }
};

// Rate Limiter خاص بـ Dashboard (200 طلب في 15 دقيقة)
export const getDashboardLimiter = () => {
  const limiterOpts = {
    points: 200, // عدد الطلبات
    duration: 900, // 15 دقيقة
    blockDuration: 60 * 15, // حظر 15 دقيقة
  };

  let dashboardLimiter;

  if (isRedisAvailable && redisClient) {
    dashboardLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      ...limiterOpts,
      keyPrefix: 'dashboard-limiter:',
    });
  } else {
    dashboardLimiter = new RateLimiterMemory(limiterOpts);
  }

  return async (req, res, next) => {
    try {
      const key = req.user?.id || req.ip;
      await dashboardLimiter.consume(key);
      next();
    } catch (err) {
      if (err.isFirstInDuration !== undefined) {
        const retrySecs = Math.round(err.msBeforeNext / 1000) || 1;
        Logger.warn(`⚠️ Dashboard Rate Limit exceeded - IP: ${req.ip}, User: ${req.user?.id || 'Guest'}`);
        
        res.set('Retry-After', String(retrySecs));
        return res.status(429).json({
          status: 'error',
          message: 'تم تجاوز حد الطلبات المسموح للـ Dashboard',
          retryAfter: retrySecs,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw err;
      }
    }
  };
};
