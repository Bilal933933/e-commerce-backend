import asyncHandler from '../middleware/asyncHandler.js';
import AuthService from '../services/auth.service.js';

export const registerUser = asyncHandler(async (req, res) => {
    const result = await AuthService.register(req.body);

    res.status(201).json({
        status: 'success',
        message: 'تم التسجيل بنجاح',
        data: result,
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const result = await AuthService.login(req.body);

    res.status(200).json({
        status: 'success',
        message: 'تم تسجيل الدخول بنجاح',
        data: result,
    });
});