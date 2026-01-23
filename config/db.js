import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/e-commerce-backend';

class Database {
  static connection = null;

  static async connect() {
    if (Database.connection) return Database.connection;

    try {
      Database.connection = await mongoose.connect(MONGODB_URI);
      console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
      return Database.connection;
    } catch (err) {
      console.error('❌ فشل الاتصال بقاعدة البيانات:', err);
      process.exit(1); // اغلاق التطبيق لو فشل الاتصال
    }
  }
}


export default Database;