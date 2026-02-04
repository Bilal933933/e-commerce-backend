import validateId from "../validators/validateId.js";
import ValidationUserSettings from "../validators/userSettings.validator.js";
import AppError from "../utils/AppError.js";
import Logger from "../utils/logger.js";
import UserSettings from "../models/UserSettings.model.js";
import CacheService from "../cache/cache.service.js";
import cacheKeys from "../cache/cache.keys.js";
/**
 * مصدر واحد للحقيقة (Single Source of Truth)
 */
const DEFAULT_SETTINGS = {
  theme: "light",
  language: "ar",
  size: "medium",
  currency: "EGP",
  timezone: "Africa/Cairo",
  dateFormat: "DD/MM/YYYY",
  rtl: true,
  notifications: true,
};

class UserSettingsService {
  constructor(userSettingsModel) {
    this.userSettingsModel = userSettingsModel;
  }

  // =========================
  // Get User Settings
  // =========================
  async getUserSettings(userId) {
    validateId(userId);

    const cacheKey = cacheKeys.userSettings.item(userId);
    const cached = await CacheService.get(cacheKey);

    if (cached) {
      return cached;
    }

    let userSettings = await this.userSettingsModel.findOne({ userId }).lean();

    // إنشاء الإعدادات إن لم تكن موجودة
    if (!userSettings) {
      userSettings = await this.userSettingsModel.create({
        userId,
        settings: DEFAULT_SETTINGS,
      });

      Logger.info(`إنشاء إعدادات افتراضية للمستخدم: ${userId}`);
      return userSettings.toObject();
    }

    // ضمان عدم نقص أي قيمة
    userSettings.settings = {
      ...DEFAULT_SETTINGS,
      ...userSettings.settings,
    };

    Logger.info(`جلب إعدادات المستخدم: ${userId}`);
    await CacheService.set(cacheKey, userSettings);
    return userSettings;
  }

  // =========================
  // Get All User Settings (Admin)
  // =========================
  async getAllUserSettings() {
    const settings = await this.userSettingsModel.find({}).lean();
    Logger.info("جلب جميع إعدادات المستخدمين");
    return settings;
  }

  // =========================
  // Update User Settings (Partial Update)
  // =========================
  async updateUserSettings(userId, settingsData) {
    validateId(userId);
    ValidationUserSettings.validateUpdateData(settingsData);

    const existing = await this.userSettingsModel.findOne({ userId });

    if (!existing) {
      throw new AppError("إعدادات المستخدم غير موجودة", 404);
    }

    existing.settings = {
      ...DEFAULT_SETTINGS,
      ...existing.settings,
      ...settingsData,
    };

    await existing.save();

    Logger.info(`تحديث إعدادات المستخدم: ${userId}`);

    await CacheService.del("userSettings:list:*");
    await CacheService.del(`userSettings:item:${userId}`);
    return existing;
  }

  // =========================
  // Reset User Settings
  // =========================
  async reset(userId) {
    validateId(userId);
    ValidationUserSettings.validateAllSettings(DEFAULT_SETTINGS);

    const settings = await this.userSettingsModel.findOneAndUpdate(
      { userId },
      {
        $set: { settings: DEFAULT_SETTINGS },
      },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    );

    Logger.info(`إعادة تعيين إعدادات المستخدم: ${userId}`);

    await CacheService.del("userSettings:list:*");
    await CacheService.del(`userSettings:item:${userId}`);
    return settings;
  }
}

export default new UserSettingsService(UserSettings);
