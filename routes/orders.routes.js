import express from "express";
import authMiddleware from '../middleware/verifyToken.js';
import restrictTo from "../middleware/restrictTo.js";
import checkOrderOwnership from "../middleware/checkOrderOwnership.js";
import restrictOrderStatus from "../middleware/restrictOrderStatus.js";
import validateOrderStatusTransition from "../middleware/validateOrderStatusTransition.js";
import ordersController from "../controllers/orders.controller.js";

const router = express.Router();

/* =======================
   User Routes
======================= */

// Create order
// router.post("/", authMiddleware, createOrder);
router.post("/", authMiddleware, ordersController.createOrder);

// Get my orders
router.get("/my", authMiddleware, ordersController.getMyOrders);

// Get single order (User / Admin)
router.get(
  "/:id",
  authMiddleware,
  checkOrderOwnership,
  ordersController.getOrderById
);
// router.get(
//   "/:id",
//   authMiddleware,
//   checkOrderOwnership,
//   getOrderById
// );

// Cancel order
router.patch(
  "/cancel/:id",
  authMiddleware,
  checkOrderOwnership,
  restrictOrderStatus,
  ordersController.cancelOrder
);
// router.patch(
//   "/cancel/:id",
//   authMiddleware,
//   checkOrderOwnership,
//   restrictOrderStatus,
//   cancelOrder
// );

/* =======================
   Admin Routes
======================= */

// Get all orders
router.get(
  "/",
  authMiddleware,
  restrictTo("admin"),
  ordersController.getAllOrders
);
// router.get(
//   "/",
//   authMiddleware,
//   restrictTo("admin"),
//   getAllOrders
// );

// Update order status
router.patch(
  "/status/:id",
  authMiddleware,
  restrictTo("admin"),
  checkOrderOwnership,
  validateOrderStatusTransition,
  ordersController.updateStatus
);
// router.patch(
//   "/status/:id",
//   authMiddleware,
//   restrictTo("admin"),
//   checkOrderOwnership,
//   validateOrderStatusTransition,
//   updateOrderStatus
// );

export default router;
