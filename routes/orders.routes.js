import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

import protect from "../middleware/protect.js";
import restrictTo from "../middleware/restrictTo.js";

import checkOrderOwnership from "../middleware/checkOrderOwnership.js";
import restrictOrderStatus from "../middleware/restrictOrderStatus.js";
import validateOrderStatusTransition from "../middleware/validateOrderStatusTransition.js";

const router = express.Router();

/* =======================
   User Routes
======================= */

// Create order
router.post("/", protect, createOrder);

// Get my orders
router.get("/my", protect, getMyOrders);

// Get single order (User / Admin)
router.get(
  "/:id",
  protect,
  checkOrderOwnership,
  getOrderById
);

// Cancel order
router.patch(
  "/:id/cancel",
  protect,
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
  protect,
  restrictTo("ADMIN"),
  getAllOrders
);

// Update order status
router.patch(
  "/:id/status",
  protect,
  restrictTo("ADMIN"),
  validateOrderStatusTransition,
  updateOrderStatus
);

export default router;
