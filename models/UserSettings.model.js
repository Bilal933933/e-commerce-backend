import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true,
  },
  settings: {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "light",
    },
    language: {
      type: String,
      enum: ["ar", "en"],
      default: "ar",
      required: true,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },
    currency: {
      type: String,
      enum: ["EGP", "USD", "EUR"],
      default: "EGP",
    },
    timezone: {
      type: String,
      default: "Africa/Cairo",
    },
    dateFormat: {
      type: String,
      enum: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
      default: "DD/MM/YYYY",
    },
    rtl: {
      type: Boolean,
      default: true,
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// ============================================
// INDEXES
// ============================================
userSettingsSchema.index({ 'settings.language': 1 });
userSettingsSchema.index({ 'settings.theme': 1 });
userSettingsSchema.index({ 'settings.currency': 1 });

// ============================================
// VIRTUAL FIELDS
// ============================================
userSettingsSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// ============================================
// MIDDLEWARE
// ============================================
// التحقق من وجود المستخدم قبل الحفظ
userSettingsSchema.pre('save', async function() {
  const User = mongoose.model('User');
  const userExists = await User.findById(this.userId);
  if (!userExists) {
    throw new Error('User not found. Cannot create settings for non-existent user.');
  }
});

// منع تعديل الحقول المحمية
userSettingsSchema.pre('findOneAndUpdate', function() {
  const update = this.getUpdate();
  
  // منع تعديل userId بعد الإنشاء
  if (update.$set && update.$set.userId) {
    delete update.$set.userId;
  }
});

// ============================================
// STATICS METHODS
// ============================================
userSettingsSchema.statics.findByUserId = async function(userId) {
  return this.findOne({ userId }).populate('user');
};

userSettingsSchema.statics.createDefaultSettings = async function(userId) {
  return this.create({
    userId,
    settings: {
      language: "ar",
      theme: "light",
      size: "medium",
      notifications: true,
      currency: "EGP",
      timezone: "Africa/Cairo",
      dateFormat: "DD/MM/YYYY",
      rtl: true,
    },
  });
};

userSettingsSchema.statics.getOrCreateByUserId = async function(userId) {
  let settings = await this.findOne({ userId });
  
  if (!settings) {
    settings = await this.createDefaultSettings(userId);
  }
  
  return settings;
};

// ============================================
// INSTANCE METHODS
// ============================================
userSettingsSchema.methods.updateSettings = async function(updates) {
  // تحديث الحقول المسموح بها فقط
  const allowedFields = ['theme', 'language', 'size', 'currency', 'timezone', 'dateFormat', 'rtl', 'notifications'];
  
  Object.keys(updates).forEach(key => {
    if (allowedFields.includes(key)) {
      this.settings[key] = updates[key];
    }
  });
  
  return this.save();
};

userSettingsSchema.methods.resetToDefaults = async function() {
  this.settings = {
    theme: "light",
    language: "ar",
    size: "medium",
    currency: "EGP",
    timezone: "Africa/Cairo",
    dateFormat: "DD/MM/YYYY",
    rtl: true,
    notifications: true,
  };
  
  return this.save();
};

userSettingsSchema.methods.getPublicData = function() {
  return {
    _id: this._id,
    settings: this.settings,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// ============================================
// HOOKS
// ============================================
userSettingsSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    console.log(`[UserSettings] Deleted settings for user: ${doc.userId}`);
  }
});

userSettingsSchema.post('save', function(doc) {
  console.log(`[UserSettings] Settings updated for user: ${doc.userId}`);
});

// ============================================
// EXPORT
// ============================================
const UserSettings = mongoose.model("UserSettings", userSettingsSchema);

export default UserSettings;