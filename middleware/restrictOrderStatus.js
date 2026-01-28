import AppError from "../utils/AppError.js";

const LOCKED_STATUSES = ["shipped", "delivered", "cancelled"];

const restrictOrderStatus = (req, res, next) => {
  const { status } = req.order;

  if (LOCKED_STATUSES.includes(status)) {
    return next(
      new AppError(
        `الحالة ${status} مقفولة لا يمكن تغييرها '${status}'`,
        400
      )
    );
  }

  next();
};

export default restrictOrderStatus;


// git add middleware/restrictOrderStatus.js
// git commit -m "feat: restrict order modification based on status"
