import asyncHandler from "../middleware/asyncHandler.js";
import UsersService from "../services/users.service.js";
import { BaseController } from "../utils/baseController.js";

class UsersController extends BaseController {


    constructor(service = UsersService) {
        super(service);
    }

    getUserProfile = asyncHandler(async (req, res) => {
        const data = await this.service.getUserProfile(req.user.id, req.user.id, req.ip, req.headers['user-agent']);
        this.logAction("جلب الملف الشخصي للمستخدم", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب الملف الشخصي بنجاح", 200);
    });

    updateUserProfile = asyncHandler(async (req, res) => {
        const data = await this.service.updateUserProfile(req.user.id, req.user.id, req.body, req.ip, req.headers['user-agent']);
        this.logAction("تحديث الملف الشخصي للمستخدم", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم تحديث الملف الشخصي بنجاح", 200);
    });

    getAllUsers = asyncHandler(async (req, res) => {
        const data = await this.service.getAllUsers(req.user.id, req.ip, req.headers['user-agent']);
        this.logAction("جلب جميع المستخدمين", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب جميع المستخدمين بنجاح", 200);
    });

    getAllAdmins = asyncHandler(async (req, res) => {
        const data = await this.service.getAllAdmins(req.user.id, req.ip, req.headers['user-agent']);
        this.logAction("جلب جميع المديرين", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب جميع المديرين بنجاح", 200);
    });

    getAllClients = asyncHandler(async (req, res) => {
        const data = await this.service.getAllClients(req.user.id, req.ip, req.headers['user-agent']);
        this.logAction("جلب جميع العملاء", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب جميع العملاء بنجاح", 200);
    });

    blockUser = asyncHandler(async (req, res) => {
        const data = await this.service.blockUser(req.user.id, req.params.id, req.ip, req.headers['user-agent']);
        this.logAction("حظر المستخدم", `المعرف: ${req.params.id}`);
        this.send(res, data, "تم حظر المستخدم بنجاح", 200);
    });

    unblockUser = asyncHandler(async (req, res) => {
        const data = await this.service.unblockUser(req.user.id, req.params.id, req.ip, req.headers['user-agent']);
        this.logAction("إلغاء حظر المستخدم", `المعرف: ${req.params.id}`);
        this.send(res, data, "تم إلغاء حظر المستخدم بنجاح", 200);
    });

    updateUserRole = asyncHandler(async (req, res) => {
        const data = await this.service.updateUserRole(req.user.id, req.params.userId, req.body.role, req.ip, req.headers['user-agent']);
        this.logAction("تحديث دور المستخدم", `المعرف: ${req.params.userId}, الدور الجديد: ${req.body.role}`);
        this.send(res, data, "تم تحديث دور المستخدم بنجاح", 200);
    });
}

export default new UsersController();