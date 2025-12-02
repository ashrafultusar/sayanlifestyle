import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    size: { type: String, required: true },
    Category: { type: String, required: true },
    homeCategory: { type: String, default: "" }, // Home category field
    Code: { type: String, required: true }, 
    regularPrice: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 }, // Optional field, defaults to 0 if not provided
    description: { type: String },
    image: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
