import UserActivityService from "../services/userActivity.service.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { BaseController } from "../utils/baseController.js";

class UserActivityController extends BaseController {

    constructor(service = UserActivityService) {
        super(service);
    }
    getUserActivities = asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const data = await this.service.getUserActivities(userId, req.query);
        this.logAction("جلب أنشطة المستخدم", `المعرف: ${userId}, الاستعلام: ${JSON.stringify(req.query)}`);
        this.send(res, data, "تم جلب أنشطة المستخدم بنجاح", 200);
    });
}

export default new UserActivityController();