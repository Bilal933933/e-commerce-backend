import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import validateId from "../validators/validateId.js";
import Logger from "../utils/logger.js";

class OrderService {
 static async createOrder(orderData) {
  const { user, items, shippingAddress } = orderData;

  // 1️⃣ التحقق من المستخدم
  validateId(user);

  const userExists = await User.findById(user);
  if (!userExists) {
    Logger.error(`المستخدم غير موجود : ${user}`);
    throw new AppError("المستخدم غير موجود", 404);
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError("يجب أن يحتوي الطلب على عنصر واحد على الأقل", 400);
  }

  let totalPrice = 0;
  const orderItems = [];

  // 2️⃣ معالجة كل عنصر في الطلب
  for (const item of items) {
    validateId(item.product);

    const product = await Product.findById(item.product);
    if (!product) {
      throw new AppError("المنتج غير موجود", 404);
    }

    const price = product.price;
    const quantity = item.quantity;
    const subtotal = price * quantity;

    totalPrice += subtotal;

    orderItems.push({
      product: product._id,
      name: product.name,     // snapshot
      price: price,           // snapshot
      quantity,
      subtotal,
    });
  }

  // 3️⃣ إنشاء الطلب بالقيم المحسوبة فقط
  const newOrder = await Order.create({
    user,
    items: orderItems,
    shippingAddress,
    totalPrice,
  });

  Logger.info(`تم إنشاء الطلب بنجاح : ${newOrder._id}`);
  return newOrder;
}


  static async getOrderById(id) {
    validateId(id);
    const order = await Order.findById(id);
    if (!order) {
        Logger.error(`الطلب غير موجود : ${id}`);
        throw new AppError("الطلب غير موجود", 404);
    }
    Logger.info(`تم جلب الطلب بنجاح : ${order._id}`);
    return order;
  }

  static async updateOrderstatus(req, res) {
    const order = req.order; // جاي من checkOrderOwnership
  const { status } = req.body;
  order.status = status;
  const updatedOrder = await order.save();
  Logger.info(`تم تحديث حالة الطلب بنجاح : ${updatedOrder._id}`);
  return updatedOrder;
  }

  static async deleteOrder(id) {
    validateId(id);
    const order = await Order.findById(id);
    if (!order) {
        Logger.error(`الطلب غير موجود : ${id}`);
        throw new AppError("الطلب غير موجود", 404);
    }
    const deletedOrder = await Order.findByIdAndDelete(id);
    Logger.info(`تم حذف الطلب بنجاح : ${deletedOrder._id}`);
    return deletedOrder;
  }

  static async getMyOrders(userId) {
    validateId(userId);
    const orderId = await Order.find({ user: userId });
    if (!orderId || orderId.length === 0) {
        Logger.error(`الطلب غير موجود للمستخدم : ${userId}`);
        throw new AppError("الطلب غير موجود", 404);
    }
    const orders = await Order.find({ user: userId });
    Logger.info(`تم جلب طلبات المستخدم بنجاح : ${userId}`);
    return orders;
  }

  static async getAllOrders() {
    const orders = await Order.find()
  .populate("user", "name email")
  .populate("items.product", "name price");
    if (!orders || orders.length === 0) {
        Logger.error(`لا توجد طلبات`);
        throw new AppError("لا توجد طلبات", 404);
    }
    Logger.info(`تم جلب جميع الطلبات بنجاح`);
    return orders;
  }
  static async cancelOrder(id) {
    console.log("Canceling order with ID:", id);
    validateId(id);
    const order = await Order.findById(id);
    if (!order) {
        Logger.error(`الطلب غير موجود : ${id}`);
        throw new AppError("الطلب غير موجود", 404);
    }
    order.status = "cancelled";
    await order.save();
    Logger.info(`تم إلغاء الطلب بنجاح : ${order._id}`);
    return order;
  }
  }

export default OrderService;