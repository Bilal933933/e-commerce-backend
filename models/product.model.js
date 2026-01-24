import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// index to optimize search by name
productSchema.index({ name: "text" });

// index to optimize search by category
productSchema.index({ categoryId: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
