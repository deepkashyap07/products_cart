import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  // Automatically add createdAt and updatedAt fields
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
