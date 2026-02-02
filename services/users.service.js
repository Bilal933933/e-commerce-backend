import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import AppError from '../utils/AppError.js';
import Logger from '../utils/logger.js';
import Validation from '../validators/auth.validator.js';
import validateId from '../validators/validateId.js';

// class UsersService {
//     // طرق خدمة المستخدمين ستذهب هنا
//     static async getAllUsers() {
//         // get all users from database
//         const users = await User.find().select('-password');
//         if (!users) {
//             Logger.error('لا يوجد مستخدمين');
//             throw new AppError('لا يوجد مستخدمين', 404);
//         }
//         Logger.info(`تم جلب ${users.length} مستخدمين`);
//         return users;
//     }

//     static async getUserProfile(userId) {
//         validateId(userId);
//         const user = await User.findById(userId).select('-password');
//         if (!user) {
//             Logger.error('لا يوجد مستخدم بهذا الرقم');
//             throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
//         }
//         Logger.info(`تم جلب مستخدم برقم ${userId}`);
//         return user;
//     }

//     static async updateUserProfile(userId, userData) {
//         validateId(userId);
//         Validation.validateUpdate(userData);
//         const user = await User.findByIdAndUpdate(userId, userData, { new: true });
//         if (!user) {
//             Logger.error('لا يوجد مستخدم بهذا الرقم');
//             throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
//         }
//         if (userData.password) {
//             user.password = await bcrypt.hash(userData.password, 10);
//         }
//         if (userData.email) {
//             const emailExists = await User.findOne({ email: userData.email });
//             if (emailExists) {
//                 Logger.error('البريد الإلكتروني موجود بالفعل');
//                 throw new AppError('البريد الإلكتروني موجود بالفعل', 400);
//             }
//             user.email = userData.email;
//         }
//         if (userData.name) {
//             user.name = userData.name;
//         }
//         await user.save();
//         Logger.info(`تم تحديث مستخدم برقم ${userId}`);
//         return user;
//     }
//     static async deleteUser(userId) {
//         validateId(userId);
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) {
//             Logger.error('لا يوجد مستخدم بهذا الرقم');
//             throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
//         }
//         Logger.info(`تم حذف مستخدم برقم ${userId}`);
//         return user;
//     }
// }

// export default UsersService;

class UsersService {
    async getAllUsers() {
        const users = await User.find().select('-password');
        if (!users) {
            throw new AppError('لا يوجد مستخدمين', 404);
        }
        return users;
    }
    async getUserProfile(userId) {
        validateId(userId);
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }
        return user;
    }
    async updateUserProfile(userId, userData) {
        validateId(userId);
        const user = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }
        if (userData.password) {
            user.password = await bcrypt.hash(userData.password, 10);
        }
        if (userData.email) {
            const emailExists = await User.findOne({ email: userData.email });
            if (emailExists) {
                throw new AppError('البريد الإلكتروني موجود بالفعل', 400);
            }
            user.email = userData.email;
        }
        if (userData.name) {
            user.name = userData.name;
        }
        await user.save();
        return user;
    }
    async deleteUser(userId) {
        validateId(userId);
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }
        return user;
    }
}

export default new UsersService();