import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // من قام بالفعل
  },
  action: {
    type: String,
    enum: [
      "login",
      "logout",
      "update_profile",
      "delete_account",
      "block_user",
      "unblock_user",
      "role_change",
      "view_profile",
      "جلب جميع المستخدمين",
      "جلب جميع المديرين",
      "جلب جميع العملاء",
        "جلب بيانات المستخدم", // إضافة أي إجراءات أخرى
      "تحديث بيانات المستخدم",
      "حظر المستخدم",
      "إلغاء حظر المستخدم",
      "تحديث دور المستخدم",
      "عرض ملف المستخدم",
      "تسجيل دخول",
      "تسجيل حساب جديد",
    ],
    required: true,
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // إذا كان الحدث يؤثر على مستخدم آخر
  },
  ip: {
    type: String, // لتسجيل IP المستخدم
  },
  userAgent: {
    type: String, // نوع الجهاز أو المتصفح
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: String, // أي معلومات إضافية عن الحدث
  },
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;
