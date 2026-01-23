import Logger from "./logger.js";

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Logger.error(`${message} - ${statusCode} ${this.status}`);
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;