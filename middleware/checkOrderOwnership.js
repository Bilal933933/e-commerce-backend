import Order from "../models/order.model.js";
import AppError from "../utils/AppError.js";

const checkOrderOwnership = async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new AppError("الطلب غير موجود", 404));
  }

  // Admin له صلاحية كاملة
  if (req.user.role === "ADMIN") {
    req.order = order;
    return next();
  }

  // User لازم يكون صاحب الطلب
  if (order.user.toString() !== req.user.id) {
    return next(new AppError("ليس لديك صلاحية للوصول بهذا الطلب", 403));
  }

  // تمرير الطلب لتجنب Query مكرر
  req.order = order;
  next();
};

export default checkOrderOwnership;
