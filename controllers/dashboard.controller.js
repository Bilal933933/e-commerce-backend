import DashboardService from "../services/dashboard.service.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { BaseController } from "../utils/baseController.js";

class DashboardController extends BaseController {
    constructor(service = DashboardService) {
        super(service);
    }

    getUsersSummary = asyncHandler(async (req, res, next) => {
        const usersSummary = await this.service.getUsersSummary();
        this.logAction("جلب ملخص المستخدمين", `المعرف: ${req.user._id}`);
        this.send(res, usersSummary, "تم جلب ملخص المستخدمين بنجاح", 200);
    });

    getOrdersSummary = asyncHandler(async (req, res, next) => {
        const ordersSummary = await this.service.getOrdersSummary();
        this.logAction("جلب ملخص الطلبات", `المعرف: ${req.user._id}`);
        this.send(res, ordersSummary, "تم جلب ملخص الطلبات بنجاح", 200);
    });

    getSettingsSummary = asyncHandler(async (req, res, next) => {
        const settingsSummary = await this.service.getSettingsSummary();
        this.logAction("جلب ملخص الاعدادات", `المعرف: ${req.user._id}`);
        this.send(res, settingsSummary, "تم جلب ملخص الاعدادات بنجاح", 200);
    });

    getProductsSummary = asyncHandler(async (req, res, next) => {
        const productsSummary = await this.service.getProductsSummary();
        this.logAction("جلب ملخص المنتجات", `المعرف: ${req.user._id}`);
        this.send(res, productsSummary, "تم جلب ملخص المنتجات بنجاح", 200);
    });

    getOverallSummary = asyncHandler(async (req, res, next) => {
        const dashboard = await this.service.getOverallSummary(); // لا حاجة لـ req.user._id الآن
        this.logAction("جلب لوحة التحكم", `المعرف: ${req.user._id}`);
        this.send(res, dashboard, "تم جلب لوحة التحكم بنجاح", 200);
    });
}

export default new DashboardController();
