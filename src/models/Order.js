// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
//   {
//     orderId: {
//       type: String,
//       required: true,
//       unique: true,
//       default: function () {
//         const now = new Date();
//         const year = now.getFullYear();
//         const month = String(now.getMonth() + 1).padStart(2, "0");
//         const day = String(now.getDate()).padStart(2, "0");
//         const random = Math.floor(Math.random() * 900) + 100;
//         return `#ORD-${year}-${month}${day}-${random}`;
//       },
//     },
//     fullName: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     notes: { type: String },
//     location: { type: String, enum: ["inside", "outside"], required: true },
//     products: [
//       {
//         title: String,
//         price: Number,
//         discountPrice: Number,
//         size: String,
//         image: String,
//         quantity: Number,
//       },
//     ],
//     courierCharge: Number,
//     totalAmount: Number,
//     paymentMethod: { type: String, default: "Cash on Delivery" },
//     status: { type: String, default: "Pending" },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Order || mongoose.model("Order", OrderSchema);



import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String }, // to store product unique ID
    title: String,
    price: Number,
    discountPrice: Number,
    regularPrice: Number, // add regular price if you need it
    size: String,
    image: String,
    quantity: { type: Number, default: 1 },
    courierLocation: { type: String }, // in case you need per-product location
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
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
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    notes: { type: String },
    location: { type: String, enum: ["inside", "outside"], required: true },
    products: { type: [ProductSchema], default: [] },
    courierCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
