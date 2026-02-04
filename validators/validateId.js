import mongoose from "mongoose";
import Logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

export function validateId(id) {
    if (!id) {
        Logger.error('المعرف مطلوب');
        throw new AppError('المعرف مطلوب', 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        Logger.error('معرف غير صالح');
        throw new AppError('معرف غير صالح', 400);
    }
}

export default validateId;