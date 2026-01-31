import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true, // snapshot
      trim: true,
    },
    price: {
      type: Number,
      required: true, // snapshot
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "يجب أن يحتوي الطلب على عنصر واحد على الأقل",
      },
    },

    shippingAddress: {
      city: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
      building: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    cancelledBy: {
      type: String,
      enum: ["user", "admin"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


// index to optimize queries by user and status
orderSchema.index({ user: 1, status: 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;
