import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
  product: {
    productId: String,
    title: String,
    image: String,
    size: String,
    quantity: Number,
    price: Number,
    courierLocation: String,
  },
  customer: {
    fullName: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    notes: String,
  },
  courierCharge: Number,
  totalAmount: Number,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
