// src/cache/cache.service.js

import cacheClient from "./cache.client.js";
import Logger from "../utils/logger.js";

class CacheService {
  /**
   * Get data from cache (جلب البيانات من الكاش)
   */
  static async get(key) {
    try {
      const data = await cacheClient.get(key);

      if (!data) return null;

      return JSON.parse(data);
    } catch (error) {
      Logger.warn(`تعذر جلب البيانات من الكاش: ${key}`);
      return null; // Silent fail
    }
  }

  /**
   * Set data in cache (تخزين البيانات في الكاش)
   */
  static async set(key, value, ttl = 60) {
    try {
      await cacheClient.set(key, JSON.stringify(value), ttl);
    } catch (error) {
      Logger.warn(`تعذر تخزين البيانات في الكاش: ${key}`);
      // Silent fail
    }
  }

  /**
   * Delete cache by pattern (مسح الكاش باستخدام نمط)
   */
  static async del(pattern) {
    try {
      await cacheClient.del(pattern);
    } catch (error) {
      Logger.warn(`تعذر مسح الكاش باستخدام النمط: ${pattern}`);
      // Silent fail
    }
  }
}

export default CacheService;
