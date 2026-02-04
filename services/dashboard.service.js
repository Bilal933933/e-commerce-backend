import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import UserSettings from "../models/UserSettings.model.js";
import Logger from "../utils/logger.js";
import CacheService from "../cache/cache.service.js";
import cacheKeys from "../cache/cache.keys.js";

class DashboardService {
    static async getUsersSummary() {
        try {
            const cacheKey = cacheKeys.dashboard.usersSummary;
            const cached = await CacheService.get(cacheKey);
            if (cached) {
                Logger.info("DashboardService.getUsersSummary - من الكاش");
                return cached;
            }

            const totalUsers = await User.countDocuments();
            const activeUsers = await User.countDocuments({ isActive: true });
            const inactiveUsers = await User.countDocuments({ isActive: false });
            const lastLogins = await User.find({}, "fullName email lastLogin")
                .sort({ lastLogin: -1 })
                .limit(5);

            const result = { totalUsers, activeUsers, inactiveUsers, lastLogins };
            await CacheService.set(cacheKey, result, 300); // 5 دقائق

            Logger.info("DashboardService.getUsersSummary - تم جلب ملخص المستخدمين");
            return result;
        } catch (error) {
            Logger.error("DashboardService.getUsersSummary - خطأ:", error);
            throw new AppError("خطأ في جلب ملخص المستخدمين", 500);
        }
    }

    static async getProductsSummary() {
        try {
            const totalProducts = await Product.countDocuments();
            const activeProducts = await Product.countDocuments({ isActive: true });
            const inactiveProducts = await Product.countDocuments({ isActive: false });
            const lastAddedProducts = await Product.find({}, "name slug createdAt")
                .sort({ createdAt: -1 })
                .limit(5);

            Logger.info("DashboardService.getProductsSummary - تم جلب ملخص المنتجات");

            return { totalProducts, activeProducts, inactiveProducts, lastAddedProducts };
        } catch (error) {
            Logger.error("DashboardService.getProductsSummary - خطأ:", error);
            throw new AppError("خطأ في جلب ملخص المنتجات", 500);
        }
    }

    static async getOrdersSummary() {
        try {
            const totalOrders = await Order.countDocuments();
            const completedOrders = await Order.countDocuments({ status: "completed" });
            const pendingOrders = await Order.countDocuments({ status: "pending" });
            const canceledOrders = await Order.countDocuments({ status: "canceled" });
            const lastOrders = await Order.find({}, "orderNumber customerName status createdAt")
                .sort({ createdAt: -1 })
                .limit(5);

            Logger.info("DashboardService.getOrdersSummary - تم جلب ملخص الطلبات");

            return { totalOrders, completedOrders, pendingOrders, lastOrders, canceledOrders };
        } catch (error) {
            Logger.error("DashboardService.getOrdersSummary - خطأ:", error);
            throw new AppError("خطأ في جلب ملخص الطلبات", 500);
        }
    }

    static async getSettingsSummary() {
        // TODO: Implement getSettingsSummary
        try {
            const totalSettings = await UserSettings.countDocuments();
            const themesCount = await UserSettings.aggregate([
                { $group: { _id: "$settings.theme", count: { $sum: 1 } } }
            ]);
            const languagesCount = await UserSettings.aggregate([
                { $group: { _id: "$settings.language", count: { $sum: 1 } } }
            ]);
            const lastSettings = await UserSettings.find({}, "userId settings")
                .sort({ createdAt: -1 })
                .limit(5);
            Logger.info("DashboardService.getSettingsSummary - تم جلب ملخص الاعدادات");

            return { totalSettings, lastSettings, themesCount, languagesCount };
        } catch (error) {
            Logger.error("DashboardService.getSettingsSummary - خطأ:", error);
            throw new AppError("خطأ في جلب ملخص الاعدادات", 500);
        }
    }

    static async getOverallSummary() {
        try {
            const cacheKey = cacheKeys.dashboard.overallSummary;
            const cached = await CacheService.get(cacheKey);
            if (cached) {
                Logger.info("DashboardService.getOverallSummary - من الكاش");
                return cached;
            }

            const usersSummary = await DashboardService.getUsersSummary();
            const productsSummary = await DashboardService.getProductsSummary();
            const ordersSummary = await DashboardService.getOrdersSummary();
            const settingsSummary = await DashboardService.getSettingsSummary();

            const result = { ...usersSummary, ...productsSummary, ...ordersSummary, ...settingsSummary };
            await CacheService.set(cacheKey, result, 300); // 5 دقائق

            Logger.info("DashboardService.getOverallSummary - تم جلب ملخص عام");
            return result;
        }
        catch (error) {
            Logger.error("DashboardService.getOverallSummary - خطأ:", error);
            throw new AppError("خطأ في جلب ملخص عام", 500);
        }
    }
}

export default DashboardService;
