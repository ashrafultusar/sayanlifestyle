
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    size: { type: String, required: true },
    Category: { type: String, required: true },
    Code: { type: String, required: true }, 
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: false, default: 0 }, 
    homeCategory: { type: String, default: "" },
    description: { type: String },
    image: { type: [String], required: true },
    
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
