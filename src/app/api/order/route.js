import connectDB from "@/lib/db";
import Order from "@/models/Order";


export const dynamic = "force-dynamic";


export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newOrder = await Order.create(body);

    return new Response(
      JSON.stringify({
        message: "Order saved",
        id: newOrder._id.toString(),
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


// GET: All orders fetch
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean(); // latest first
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}