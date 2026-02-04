import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import AppError from '../utils/AppError.js';
import validateId from '../validators/validateId.js';
import UserDTO from '../utils/services/User.js';
import UserActivityService from './userActivity.service.js';


class UsersService {
    async getAllUsers(userId, userIp, userAgent) {
        const users = await User.find().select('-password');
        if (!users) {
            throw new AppError('لا يوجد مستخدمين', 404);
        }
        const usersDTO = users.map((user) => new UserDTO(user));
        
        await UserActivityService.logActivity({
            userId: userId,
            action: 'جلب جميع المستخدمين',
            targetUserId: null,
            ip: userIp,
            userAgent: userAgent,
            details: `عدد المستخدمين: ${usersDTO.length}`
        });
        return usersDTO;
    }

    async getAllAdmins(userId, userIp, userAgent) {
        const admins = await User.find({ role: 'admin' }).select('-password');
        if (!admins) {
            throw new AppError('لا يوجد مديرين', 404);
        }
        const adminsDTO = admins.map((admin) => new UserDTO(admin));
        await UserActivityService.logActivity({
            userId: userId,
            action: 'جلب جميع المديرين',
            targetUserId: null,
            ip: userIp,
            userAgent: userAgent,
            details: `عدد المديرين: ${adminsDTO.length}`
        })
        return adminsDTO;
    }
    
    async getAllClients(userId, userIp, userAgent) {
        const clients = await User.find({ role: 'user' }).select('-password');
        if (!clients) {
            throw new AppError('لا يوجد عملاء', 404);
        }
        const clientsDTO = clients.map((client) => new UserDTO(client));
        await UserActivityService.logActivity({
            userId: userId,
            action: 'جلب جميع العملاء',
            targetUserId: null,
            ip: userIp,
            userAgent: userAgent,
            details: `عدد العملاء: ${clientsDTO.length}`
        })
        return clientsDTO;
    }
    
    async getUserProfile(userId, targetUserId, userIp, userAgent) {
        validateId(targetUserId);
        const user = await User.findById(targetUserId).select('-password');
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }
        const userDTO = new UserDTO(user);
        await UserActivityService.logActivity({
            userId: userId,
            action: 'جلب بيانات المستخدم',
            targetUserId: targetUserId,
            ip: userIp,
            userAgent: userAgent,
            details: `اسم المستخدم: ${userDTO.name}`
        })
        return userDTO;
    }
    
    async updateUserProfile(userId, targetUserId, userData, userIp, userAgent) {
        validateId(targetUserId);
        const user = await User.findByIdAndUpdate(targetUserId, userData, { new: true });
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
        const userDTO = new UserDTO(user);
        await UserActivityService.logActivity({
            userId: userId,
            action: 'تحديث بيانات المستخدم',
            targetUserId: targetUserId,
            ip: userIp,
            userAgent: userAgent,
            details: `اسم المستخدم: ${userDTO.name}`
        });
        return userDTO;
    }
    
    async blockUser(userId, targetUserId, userIp, userAgent) {
        validateId(targetUserId);
        const user = await User.findByIdAndUpdate(targetUserId, { isDeleted: true }, { new: true });
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }

        const userDTO = new UserDTO(user);
        await UserActivityService.logActivity({
            userId: userId,
            action: 'حظر المستخدم',
            targetUserId: targetUserId,
            ip: userIp,
            userAgent: userAgent,
            details: `اسم المستخدم: ${userDTO.name}`
        });
        return userDTO;
    }

    async unblockUser(userId, targetUserId, userIp, userAgent) {
        validateId(targetUserId);
        const user = await User.findByIdAndUpdate(targetUserId, { isDeleted: false }, { new: true });
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }
        const userDTO = new UserDTO(user);
        await UserActivityService.logActivity({
            userId: userId,
            action: 'إلغاء حظر المستخدم',
            targetUserId: targetUserId,
            ip: userIp,
            userAgent: userAgent,
            details: `اسم المستخدم: ${userDTO.name}`
        });
        return userDTO;
    }

    async updateUserRole(userId, targetUserId, role, userIp, userAgent) {
        validateId(targetUserId);
        const user = await User.findByIdAndUpdate(targetUserId, { role }, { new: true });
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }
        const userDTO = new UserDTO(user);
        await UserActivityService.logActivity({
            userId: userId,
            action: 'تحديث دور المستخدم',
            targetUserId: targetUserId,
            ip: userIp,
            userAgent: userAgent,
            details: `اسم المستخدم: ${userDTO.name}, الدور الجديد: ${role}`
        });
        return userDTO;
    }
}

export default new UsersService();