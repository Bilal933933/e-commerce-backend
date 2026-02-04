import userSettingsController from "../controllers/userSettings.controller.js";
import authMiddleware from '../middleware/verifyToken.js';
import restrictTo from '../middleware/restrictTo.js';
import express from "express";

const router = express.Router();

router.get("/profile", authMiddleware, userSettingsController.getUserSettings);
router.get("/", authMiddleware, restrictTo("admin"), userSettingsController.getAllUserSettings);
router.put("/profile", authMiddleware, userSettingsController.updateUserSettings);
router.delete("/profile", authMiddleware, userSettingsController.resetUserSettings);

export default router;