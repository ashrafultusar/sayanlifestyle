import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    size: { type: String, required: true },
    Chest: { type: String, required: true },
    Length: { type: String, required: true },
    Category : { type: String, required: true },
    Code: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
