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


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Order deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete order" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ order }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update status" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
