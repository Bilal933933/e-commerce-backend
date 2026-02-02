import asyncHandler from "../middleware/asyncHandler.js";
import sendResponse from "./sendResponse.js";
import Logger from "./logger.js";

class BaseController {
    constructor(service) {
        this.service = service;
    }
       
    logAction(action, details = "") {
        Logger.info(`${action} - ${details}`);
    }

    logError(error) {
        Logger.error(`Error: ${error.message} - Stack: ${error.stack}`);
    }

 send(res, statusCode, data, message) {
  sendResponse(res, statusCode, data, message);
}
}



export { BaseController };