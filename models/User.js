import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "user"],
    required: true,
    default: "user",
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  wishlist: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  viewed: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;