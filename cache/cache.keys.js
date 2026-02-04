// src/cache/cache.keys.js

/**
 * Helper لبناء Key ثابت من params
 * أي اختلاف في القيم ينتج Key مختلف
 */
const buildKeyFromParams = (params = {}) => {
  return Object.keys(params)
    .sort() // ترتيب ثابت
    .map((key) => `${key}=${params[key]}`)
    .join(":");
};

const cacheKeys = {
  products: {
    /**
     * Products List (قائمة المنتجات)
     * يدعم Pagination (تقسيم الصفحات) + Filters (التصفية)
     */
    list: (params = {}) => {
      const baseKey = "products:list";
      const paramsKey = buildKeyFromParams(params);

      return paramsKey ? `${baseKey}:${paramsKey}` : baseKey;
    },

    /**
     * Single Product (منتج واحد)
     * (مش هنستخدمه دلوقتي – جاهز للمستقبل)
     */
    item: (productId) => `products:item:${productId}`,
  },

  categories: {
    /**
     * Categories List (قائمة التصنيفات)
     */
    list: (params = {}) => {
      const baseKey = "categories:list";
      const paramsKey = buildKeyFromParams(params);

      return paramsKey ? `${baseKey}:${paramsKey}` : baseKey;
    },

    /**
     * Single Category (تصنيف واحد)
     * (مش هنستخدمه دلوقتي – جاهز للمستقبل)
     */
    item: (categoryId) => `categories:item:${categoryId}`,
  },
  userSettings: {
    
    list: (params = {}) => {
      const baseKey = "userSettings:list";
      const paramsKey = buildKeyFromParams(params);

      return paramsKey ? `${baseKey}:${paramsKey}` : baseKey;
    },
    item: (userId) => `userSettings:item:${userId}`,
  },
  dashboard: {
    overallSummary: "dashboard:overall-summary",
    usersSummary: "dashboard:users-summary",
    productsSummary: "dashboard:products-summary",
    ordersSummary: "dashboard:orders-summary",
    settingsSummary: "dashboard:settings-summary",
  }
};

export default cacheKeys;
