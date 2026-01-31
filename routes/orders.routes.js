import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

import authMiddleware from '../middleware/verifyToken.js';
import restrictTo from "../middleware/restrictTo.js";

import checkOrderOwnership from "../middleware/checkOrderOwnership.js";
import restrictOrderStatus from "../middleware/restrictOrderStatus.js";
import validateOrderStatusTransition from "../middleware/validateOrderStatusTransition.js";

const router = express.Router();

/* =======================
   User Routes
======================= */

// Create order
router.post("/", authMiddleware, createOrder);

// Get my orders
router.get("/my", authMiddleware, getMyOrders);

// Get single order (User / Admin)
router.get(
  "/:id",
  authMiddleware,
  checkOrderOwnership,
  getOrderById
);

// Cancel order
router.patch(
  "/cancel/:id",
  authMiddleware,
  checkOrderOwnership,
  restrictOrderStatus,
  cancelOrder
);

/* =======================
   Admin Routes
======================= */

// Get all orders
router.get(
  "/",
  authMiddleware,
  restrictTo("admin"),
  getAllOrders
);

// Update order status
router.patch(
  "/status/:id",
  authMiddleware,
  restrictTo("admin"),
  checkOrderOwnership,
  validateOrderStatusTransition,
  updateOrderStatus
);

export default router;
