import mongoose from "mongoose";
import Loger from "../utils/logger.js";

export function validateId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        Loger.error('معرف غير صالح');
        throw new Error('معرف غير صالح');
    }
}

export default validateId;