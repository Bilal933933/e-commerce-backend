import userSettingsService from "../services/userSettings.service.js";
import { BaseController } from "../utils/baseController.js";
import asyncHandler from "../middleware/asyncHandler.js";

 class UserSettingsController extends BaseController {
    constructor(service = userSettingsService) {
        super(service);
    }
    getAllUserSettings = asyncHandler(async (req, res) => {
        const data = await this.service.getAllUserSettings();
        this.logAction("جلب جميع إعدادات المستخدم", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب جميع إعدادات المستخدم بنجاح", 200);
    })

    getUserSettings = asyncHandler(async (req, res) => {
        const data = await this.service.getUserSettings(req.user.id);
        this.logAction("جلب إعدادات المستخدم", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم جلب إعدادات المستخدم بنجاح", 200);
    });

    updateUserSettings = asyncHandler(async (req, res) => {
        const data = await this.service.updateUserSettings(req.user.id, req.body);
        this.logAction("تحديث إعدادات المستخدم", `المعرف: ${req.user.id}`);
        this.send(res, data, "تم تحديث إعدادات المستخدم بنجاح", 200);
    });

    resetUserSettings = asyncHandler(async (req, res) => {
        const data = await this.service.reset(req.user.id);
        this.logAction("إعادة تعيين إعدادات المستخدم إلى الافتراضية", `المعرف: ${req.user.id}`);
        this.send(res, data, "تمت إعادة تعيين إعدادات المستخدم إلى الافتراضية بنجاح", 200);
    });
}

export default new UserSettingsController();