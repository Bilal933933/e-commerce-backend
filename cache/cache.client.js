// src/cache/cache.client.js

import Redis from "ioredis";
import Logger from "../utils/logger.js";

// In-Memory Cache كـ fallback
const memoryCache = new Map();

let redisClient = null;

/**
 * محاولة الاتصال بـ Redis
 */
try {
  if (process.env.REDIS_URL) {
    redisClient = new Redis(process.env.REDIS_URL);

    redisClient.on("connect", () => {
      Logger.info("تم الاتصال بـ Redis بنجاح");
    });

    redisClient.on("error", (err) => {
      Logger.warn("خطأ في اتصال Redis, سيتم استخدام الكاش الداخلي");
      Logger.error(err.message);
      redisClient = null;
    });
  }
} catch (error) {
  Logger.warn("فشل الاتصال بـ Redis, سيتم استخدام الكاش الداخلي");
  redisClient = null;
}

const cacheClient = {
  /**
   * GET (جلب من الكاش)
   */
  async get(key) {
    if (redisClient) {
      return await redisClient.get(key);
    }

    return memoryCache.get(key) || null;
  },

  /**
   * SET (تخزين في الكاش)
   */
  async set(key, value, ttl = 60) {
    if (redisClient) {
      await redisClient.set(key, value, "EX", ttl);
      return;
    }

    memoryCache.set(key, value);

    // TTL للـ In-Memory
    setTimeout(() => {
      memoryCache.delete(key);
    }, ttl * 1000);
  },

  /**
   * DEL (مسح الكاش)
   */
  async del(pattern) {
    if (redisClient) {
      const keys = await redisClient.keys(pattern);

      if (keys.length > 0) {
        await redisClient.del(keys);
      }
      return;
    }

    // In-Memory delete by pattern
    for (const key of memoryCache.keys()) {
      if (key.startsWith(pattern.replace("*", ""))) {
        memoryCache.delete(key);
      }
    }
  },
};

export default cacheClient;
