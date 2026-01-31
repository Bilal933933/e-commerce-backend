import AppError from "../utils/AppError.js";

const ALLOWED_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

const validateOrderStatusTransition = (req, res, next) => {
  // ✅ تحقق من وجود الطلب أولاً
  const order = req.order;
  if (!order) {
    return next(new AppError("الطلب غير موجود", 404));
  }

  const currentStatus = order.status;
  const nextStatus = req.body.status;

  if (!nextStatus) {
    return next(new AppError("يجب تحديد الحالة الجديدة", 400));
  }

  const allowedNextStatuses = ALLOWED_TRANSITIONS[currentStatus] || [];

  if (!allowedNextStatuses.includes(nextStatus)) {
    return next(
      new AppError(
        `لا يمكن نقل الحالة من '${currentStatus}' إلى '${nextStatus}'`,
        400
      )
    );
  }

  next();
};

export default validateOrderStatusTransition;
