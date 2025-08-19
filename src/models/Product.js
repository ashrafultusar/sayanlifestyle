import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const random = Math.floor(Math.random() * 900) + 100;
        return `#ORD-${year}-${month}${day}-${random}`;
      },
    },
    title: { type: String, required: true },
    size: { type: String, required: true },
    Chest: { type: String, required: true },
    Length: { type: String, required: true },
    Category: { type: String, required: true },
    Code: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
