import asyncHandler from "./asyncHandler.js";
import AppError from "../utils/AppError.js";

const restrictTo = (...allowedRoles) => {
    return asyncHandler((req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            throw new AppError('ليس لديك صلاحية للوصول إلى هذه العملية', 403);
        }
        next();
    });
};

export default restrictTo;
