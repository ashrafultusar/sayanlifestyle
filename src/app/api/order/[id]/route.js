// import connectDB from "@/lib/db";
// import Order from "@/models/Order";
// import mongoose from "mongoose";


// export async function GET(req, context) {
//   await connectDB();

//   // params async proxy তাই await করো
//   const { id } = await context.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
//   }

//   const order = await Order.findById(id).lean();
//   if (!order) {
//     return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
//   }

//   return new Response(JSON.stringify(order), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }


import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, context) {
  await connectDB();

  // params should be awaited
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  const order = await Order.findById(id).lean();
  if (!order) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(order), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
