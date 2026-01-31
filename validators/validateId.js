import mongoose from "mongoose";
import Logger from "../utils/logger.js";

export function validateId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        Logger.error('معرف غير صالح');
        throw new Error('معرف غير صالح');
    }
}

export default validateId;