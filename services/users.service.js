import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import AppError from '../utils/AppError.js';
import validateId from '../validators/validateId.js';
import UserDTO from '../utils/services/User.js';


class UsersService {
    async getAllUsers() {
        const users = await User.find().select('-password');
        if (!users) {
            throw new AppError('لا يوجد مستخدمين', 404);
        }
        const usersDTO = users.map((user) => new UserDTO(user));
        return usersDTO;
    }
    async getUserProfile(userId) {
        validateId(userId);
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }
       const userDTO = new UserDTO(user);
        return userDTO;
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
        const userDTO = new UserDTO(user);
        return userDTO;
    }
    async deleteUser(userId) {
        validateId(userId);
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new AppError('لا يوجد مستخدم بهذا الرقم', 404);
        }

        const userDTO = new UserDTO(user);
        return userDTO;
    }
}

export default new UsersService();