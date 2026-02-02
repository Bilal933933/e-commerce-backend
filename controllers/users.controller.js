import asyncHandler from "../middleware/asyncHandler.js";
import UsersService from "../services/users.service.js";
import { BaseController } from "../utils/baseController.js";

class UsersController extends BaseController {
    constructor(service = UsersService) {
        super(service);
    }

    getUserProfile = asyncHandler(async (req, res) => {
        const data = await this.service.getUserProfile(req.user.id);
        this.logAction("جلب الملف الشخصي للمستخدم", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب الملف الشخصي بنجاح", 200);
    });

    updateUserProfile = asyncHandler(async (req, res) => {
        const data = await this.service.updateUserProfile(req.user.id, req.body);
        this.logAction("تحديث الملف الشخصي للمستخدم", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم تحديث الملف الشخصي بنجاح", 200);
    });

    getAllUsers = asyncHandler(async (req, res) => {
        const data = await this.service.getAllUsers();
        this.logAction("جلب جميع المستخدمين", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب جميع المستخدمين بنجاح", 200);
    });

    deleteUser = asyncHandler(async (req, res) => {
        const data = await this.service.deleteUser(req.params.id);
        this.logAction("حذف المستخدم", `المعرف: ${req.params.id}`);
        this.send(res, data, "تم حذف المستخدم بنجاح", 200);
    });
}

export default new UsersController();