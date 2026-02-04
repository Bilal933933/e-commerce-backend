import AppError from "../utils/AppError.js";

class ValidationUserSettings {
  // قائمة القيم الصحيحة لكل حقل
  static validValues = {
    language: ['ar', 'en'],
    theme: ['light', 'dark', 'system'],
    size: ['small', 'medium', 'large'],
    currency: ['EGP', 'USD', 'EUR'],
    timezone: ['Africa/Cairo', 'UTC', 'America/New_York', 'Europe/London', 'Asia/Dubai'],
    dateFormat: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'],
  };

  static booleanFields = ['rtl', 'notifications'];

  // التحقق من صحة الإعدادات
  static validateAllSettings(settings) {
    if (!settings || typeof settings !== 'object') {
      throw new AppError('الإعدادات يجب أن تكون كائن', 400);
    }

    const errors = [];

    // التحقق من الحقول ذات القيم المحددة
    for (const [field, validValues] of Object.entries(this.validValues)) {
      if (settings[field] !== undefined && !validValues.includes(settings[field])) {
        errors.push(`${field}: ${validValues.join(' أو ')}`);
      }
    }

    // التحقق من الحقول المنطقية (Boolean)
    for (const field of this.booleanFields) {
      if (settings[field] !== undefined && typeof settings[field] !== 'boolean') {
        errors.push(`${field} يجب أن يكون true أو false`);
      }
    }

    if (errors.length > 0) {
      throw new AppError(errors.join('\n'), 400);
    }

    return true;
  }

  // التحقق من بيانات التحديث
  static validateUpdateData(data) {
    if (!data || typeof data !== 'object') {
      throw new AppError('البيانات يجب أن تكون كائن', 400);
    }

    if (Object.keys(data).length === 0) {
      throw new AppError('يجب توفير حقل واحد على الأقل للتحديث', 400);
    }

    return this.validateAllSettings(data);
  }
}

export default ValidationUserSettings;