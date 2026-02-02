import OrderService from '../services/orders.service.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { BaseController } from '../utils/baseController.js';

class OrdersController extends BaseController {
  constructor(service = OrderService) {
      super(service);
  }

  createOrder = asyncHandler(async (req, res) => {
    const data = await this.service.createOrder(req.body);
    this.logAction("إنشاء طلب", `المستخدم: ${req.user.id}`);
    this.send(res, data, "تم إنشاء الطلب بنجاح", 201);
  });

  getAllOrders = asyncHandler(async (req, res) => {
    const data = await this.service.getAllOrders(req.query);
    this.logAction("جلب جميع الطلبات", `الاستعلام: ${JSON.stringify(req.query)}`);
    this.send(res, data, "تم جلب جميع الطلبات بنجاح", 200);
  });

  getMyOrders = asyncHandler(async (req, res) => {
    const data = await this.service.getMyOrders({
      userId: req.user.id,
      queryParams: req.query
    });
    this.logAction("جلب طلبات المستخدم", req.user.id);
    this.send(res, data, "تم جلب الطلبات بنجاح", 200);
  });

  getOrderById = asyncHandler(async (req, res) => {
    const data = await this.service.getOrderById(req.params.id);
    this.logAction("جلب الطلب", req.params.id);
    this.send(res, data, "تم جلب الطلب بنجاح", 200);
  });

  updateStatus = asyncHandler(async (req, res) => {
    const data = await this.service.updateOrderStatus(req);
    this.logAction("تحديث حالة الطلب", req.params.id);
    this.send(res, data, "تم تحديث حالة الطلب بنجاح", 200);
  });

  cancelOrder = asyncHandler(async (req, res) => {
    const data = await this.service.cancelOrder(req.params.id);
    this.logAction("إلغاء الطلب", req.params.id);
    this.send(res, data, "تم إلغاء الطلب بنجاح", 200);
  });
}

export default new OrdersController();