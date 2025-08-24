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


export async function GET(req) {
  try {
    await connectDB();

    const { search, filterDate, from, to, page = 1, limit = 3 } = Object.fromEntries(new URL(req.url).searchParams);

    let query = {};

    // Search by order id
    if (search) {
      query._id = { $regex: search, $options: "i" };
    }

    const now = new Date();

    // Date filter
    if (filterDate) {
      let start, end;

      switch (filterDate) {
        case "thisWeek": {
          const day = now.getDay();
          start = new Date(now);
          start.setDate(now.getDate() - day + (day === 0 ? -6 : 1));
          end = new Date(start);
          end.setDate(start.getDate() + 6);
          break;
        }
        case "lastWeek": {
          const day = now.getDay();
          end = new Date(now);
          end.setDate(now.getDate() - day);
          start = new Date(end);
          start.setDate(end.getDate() - 6);
          break;
        }
        case "thisMonth": {
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          break;
        }
        case "lastMonth": {
          start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          end = new Date(now.getFullYear(), now.getMonth(), 0);
          break;
        }
        case "custom": {
          if (from && to) {
            start = new Date(from);
            end = new Date(to);
          }
          break;
        }
      }

      if (start && end) {
        query.orderDate = { $gte: start, $lte: end };
      }
    }

    // Pagination
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return new Response(JSON.stringify({ orders, total }), {
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