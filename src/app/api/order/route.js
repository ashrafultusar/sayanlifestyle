// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Order from "@/models/Order";


// export const dynamic = "force-dynamic";


// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const newOrder = await Order.create(body);

//     return new Response(
//       JSON.stringify({
//         message: "Order saved",
//         id: newOrder._id.toString(),
//         orderId: newOrder.orderId || newOrder._id,
//       }),
//       {
//         status: 201,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Order creation error:", error);
//     return new Response(JSON.stringify({ error: "Failed to create order" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }


// export async function GET(req) {
//   try {
//     await connectDB();

//     const { search, filterDate, from, to, page = 1, limit = 3 } = Object.fromEntries(new URL(req.url).searchParams);

//     let query = {};

//     // Search by order id
//     if (search) {
//       query._id = { $regex: search, $options: "i" };
//     }

//     const now = new Date();

//     // Date filter
//     if (filterDate) {
//       let start, end;

//       switch (filterDate) {
//         case "thisWeek": {
//           const day = now.getDay();
//           start = new Date(now);
//           start.setDate(now.getDate() - day + (day === 0 ? -6 : 1));
//           end = new Date(start);
//           end.setDate(start.getDate() + 6);
//           break;
//         }
//         case "lastWeek": {
//           const day = now.getDay();
//           end = new Date(now);
//           end.setDate(now.getDate() - day);
//           start = new Date(end);
//           start.setDate(end.getDate() - 6);
//           break;
//         }
//         case "thisMonth": {
//           start = new Date(now.getFullYear(), now.getMonth(), 1);
//           end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//           break;
//         }
//         case "lastMonth": {
//           start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//           end = new Date(now.getFullYear(), now.getMonth(), 0);
//           break;
//         }
//         case "custom": {
//           if (from && to) {
//             start = new Date(from);
//             end = new Date(to);
//           }
//           break;
//         }
//       }

//       if (start && end) {
//         query.orderDate = { $gte: start, $lte: end };
//       }
//     }

//     // Pagination
//     const pageNumber = parseInt(page, 10);
//     const pageSize = parseInt(limit, 10);
//     const total = await Order.countDocuments(query);
//     const orders = await Order.find(query)
//       .sort({ createdAt: -1 })
//       .skip((pageNumber - 1) * pageSize)
//       .limit(pageSize)
//       .lean();

//     return new Response(JSON.stringify({ orders, total }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Order fetch error:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

// Ensure dynamic (no caching for list)
export const dynamic = "force-dynamic";

// CREATE order
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Basic validation
    const required = ["fullName", "phone", "address", "city", "location", "products"];
    for (const key of required) {
      if (!body?.[key] || (key === "products" && !Array.isArray(body.products))) {
        return NextResponse.json({ success: false, error: `Missing or invalid: ${key}` }, { status: 400 });
      }
    }

    const newOrder = await Order.create(body);
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// LIST orders with search, date filters & pagination
export async function GET(req) {
  try {
    await connectDB();

    const { search, filterDate, from, to, page = "1", limit = "10" } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const query = {};

    // Search by orderId (human-friendly) or by Mongo ObjectId substring fallback
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { _id: { $regex: search, $options: "i" } }, // not efficient, but helpful
        { phone: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
      ];
    }

    // Date filtering on createdAt
    const now = new Date();
    let start, end;

    switch (filterDate) {
      case "thisWeek": {
        const day = now.getDay(); // 0 Sun..6 Sat
        start = new Date(now);
        start.setHours(0, 0, 0, 0);
        start.setDate(now.getDate() - day + (day === 0 ? -6 : 1));
        end = new Date(start);
        end.setHours(23, 59, 59, 999);
        end.setDate(start.getDate() + 6);
        break;
      }
      case "lastWeek": {
        const day = now.getDay();
        end = new Date(now);
        end.setHours(23, 59, 59, 999);
        end.setDate(now.getDate() - day); // last Sunday
        start = new Date(end);
        start.setHours(0, 0, 0, 0);
        start.setDate(end.getDate() - 6);
        break;
      }
      case "thisMonth": {
        start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      }
      case "lastMonth": {
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
        break;
      }
      case "custom": {
        if (from && to) {
          start = new Date(from);
          start.setHours(0, 0, 0, 0);
          end = new Date(to);
          end.setHours(23, 59, 59, 999);
        }
        break;
      }
    }

    if (start && end) {
      query.createdAt = { $gte: start, $lte: end };
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const [total, orders] = await Promise.all([
      Order.countDocuments(query),
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean(),
    ]);

    return NextResponse.json({ success: true, orders, total, page: pageNumber, limit: pageSize }, { status: 200 });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
