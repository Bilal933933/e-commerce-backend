import AppError from "../utils/AppError.js";

const ALLOWED_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

const validateOrderStatusTransition = (req, res, next) => {
  const currentStatus = req.order.status;
  const nextStatus = req.body.status;

  if (!nextStatus) {
    return next(new AppError("New status is required", 400));
  }

  const allowedNextStatuses = ALLOWED_TRANSITIONS[currentStatus] || [];

  if (!allowedNextStatuses.includes(nextStatus)) {
    return next(
      new AppError(
        `انقل الحالة من'${currentStatus}' الي '${nextStatus}'`,
        400
      )
    );
  }

  next();
};

export default validateOrderStatusTransition;
