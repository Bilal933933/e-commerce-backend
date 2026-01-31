import OrderServer from '../services/orders.service.js';
import asyncHandler from '../middleware/asyncHandler.js';

const createOrder = asyncHandler(async (req, res) => {
    const result = await OrderServer.createOrder(req.body);
    res.status(200).json({ status: "success", data: result, message: "تم إنشاء الطلب بنجاح" });
});

const getAllOrders = asyncHandler(async (req, res) => {
    const result = await OrderServer.getAllOrders();
    res.status(200).json({ status: "success", data: result, message: "تم جلب جميع الطلبات بنجاح" });
});

const getOrderById = asyncHandler(async (req, res) => {
    const result = await OrderServer.getOrderById(req.params.id);
    res.status(200).json({ status: "success", data: result, message: "تم جلب الطلب بنجاح" });
});

const cancelOrder = asyncHandler(async (req, res) => {
    const result = await OrderServer.cancelOrder(req.params.id);
    res.status(200).json({ status: "success", data: result, message: "تم إلغاء الطلب بنجاح" });
});

const getMyOrders = asyncHandler(async (req, res) => {
    const result = await OrderServer.getMyOrders(req.user.id);
    res.status(200).json({ status: "success", data: result, message: `تم جلب طلبات المستخدم بنجاح : ${req.user.id}` });
})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const result = await OrderServer.updateOrderstatus(req, res);
    res.status(200).json({ status: "success", data: result, message: "تم تحديث حالة الطلب بنجاح" });
});

const deleteOrder = asyncHandler(async (req, res) => {
    const result = await OrderServer.deleteOrder(req.params.id);
    res.status(200).json({ status: "success", data: result, message: "تم حذف الطلب بنجاح" });
});

export { createOrder, getAllOrders, getOrderById, cancelOrder, getMyOrders, updateOrderStatus, deleteOrder };