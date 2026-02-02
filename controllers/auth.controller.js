import asyncHandler from '../middleware/asyncHandler.js';
import AuthService from '../services/auth.service.js';
import { BaseController } from '../utils/baseController.js';




class AuthController extends BaseController {
    login = asyncHandler(async (req, res) => {
        const data = await this.service.login(req.body);
        this.logAction("تسجيل الدخول", `المستخدم: ${req.body.email}`);
        this.send(res, data, "تم تسجيل الدخول بنجاح", 200);
    });

    register = asyncHandler(async (req, res) => {
        const data = await this.service.register(req.body);
        this.logAction("تسجيل المستخدم", JSON.stringify(req.body));
        this.send(res, data, "تم تسجيل المستخدم بنجاح", 201);
    });
}

// إنشاء Instance
const authController = new AuthController(AuthService);

// التصدير للاستخدام في الـ Routes
export default authController;
