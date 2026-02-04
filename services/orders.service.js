import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import validateId from "../validators/validateId.js";
import Logger from "../utils/logger.js";
import APIFeatures from "../utils/apiFeatures.js";
import paginate from "../utils/pagination.js";

class OrderService {

  // ======================
  // Create Order
  // ======================
  async createOrder(orderData) {
    const { user, items, shippingAddress } = orderData;

    validateId(user);

    const userExists = await User.findById(user);
    if (!userExists) {
      throw new AppError("المستخدم غير موجود", 404);
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new AppError("يجب أن يحتوي الطلب على عنصر واحد على الأقل", 400);
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      validateId(item.product);

      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError("المنتج غير موجود", 404);
      }

      const quantity = item.quantity;
      const subtotal = product.price * quantity;

      totalPrice += subtotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
        subtotal
      });
    }

    const order = await Order.create({
      user,
      items: orderItems,
      shippingAddress,
      totalPrice
    });

    Logger.info(`تم إنشاء الطلب بنجاح : ${order._id}`);
    return order;
  }


  // ======================
  // Get Order By ID
  // ======================
  async getOrderById(id) {
    validateId(id);

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!order) {
      throw new AppError("الطلب غير موجود", 404);
    }

    return order;
  }

  // ======================
  // Update Order Status
  // ======================
  async updateOrderStatus({ order, status }) {
    order.status = status;
    await order.save();

    Logger.info(`تم تحديث حالة الطلب : ${order._id}`);
    return order;
  }

  // ======================
  // Delete Order
  // ======================
  async deleteOrder(id) {
    validateId(id);

    const order = await Order.findById(id);
    if (!order) {
      Logger.warn("الطلب غير موجود");
      throw new AppError("الطلب غير موجود", 404);
    }

    await order.deleteOne();
    Logger.info(`تم حذف الطلب : ${order._id}`);
    return order;
  }

  // ======================
  // Get My Orders
  // ======================
  async getMyOrders({ userId, queryParams = {} }) {
    validateId(userId);

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("المستخدم غير موجود", 404);
    }

    const features = new APIFeatures(
      Order.find({ user: userId })
        .populate("items.product", "name price")
        .populate("user", "name email"),
      queryParams
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const orders = await features.query;

    Logger.info(`تم جلب ${orders.length} طلبات`);

    const totalItems = await Order.countDocuments({ user: userId });

    const response = paginate(orders, totalItems, queryParams);
    return response;
  }

  // ======================
  // Get All Orders
  // ======================
  async getAllOrders(queryParams = {}) {

    const features = new APIFeatures(
      Order.find()
        .populate("user", "name email")
        .populate("items.product", "name price"),
      queryParams
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const orders = await features.query;

    Logger.info(`تم جلب ${orders.length} طلبات`);
    const totalItems = await Order.countDocuments();
    const response = paginate(orders, totalItems, queryParams);
    return response;
  }

  // ======================
  // Cancel Order
  // ======================
  async cancelOrder(id) {
    validateId(id);

    const order = await Order.findById(id);
    if (!order) {
      throw new AppError("الطلب غير موجود", 404);
    }
    if (order.status === "cancelled") {
      Logger.warn("الطلب م_CANCELLED");
      throw new AppError("الطلب م_CANCELLED", 400);
    }
    order.status = "cancelled";
    await order.save();

    return order;
  }
}
export default new OrderService();