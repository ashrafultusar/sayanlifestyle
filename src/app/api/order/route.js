import connectDB from "@/lib/db";
import Order from "@/models/Order";

// Disable caching (optional but useful in dev)
export const dynamic = "force-dynamic";

// Must export a named POST function (not default)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newOrder = await Order.create(body);

    return new Response(
      JSON.stringify({
        message: "Order saved",
        orderId: newOrder.orderId || newOrder._id,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return new Response(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
