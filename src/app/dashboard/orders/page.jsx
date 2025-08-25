"use client";

import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Pagination from "@/Components/Shared/Pagination";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";

const Page = () => {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const fetchOrders = async () => {
    const params = new URLSearchParams({
      search,
      filterDate,
      from,
      to,
      page: currentPage,
      limit: pageSize,
    });
    const res = await fetch(`/api/order?${params.toString()}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDate, from, to]);

  useEffect(() => {
    fetchOrders();
  }, [search, filterDate, from, to, currentPage]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Order Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Dates</option>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="custom">Custom</option>
        </select>
        {filterDate === "custom" && (
          <>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </>
        )}
      </div>

      {/* Orders Table */}
      <div className="rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Name</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className=" last:border-b-0 odd:bg-white even:bg-gray-300 hover:bg-gray-100 transition">
                <td className="p-4">{order?.orderId}</td>
                <td className="p-4">{order?.totalAmount}</td>
                <td className="p-4">{order?.customer?.fullName}</td>
                <td className="p-4">{order?.customer?.phone}</td>

                <td className="p-4">
                  <select
                    value={order.status || "pending"}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      // frontend update
                      setOrders((prev) =>
                        prev.map((o) =>
                          o._id === order._id ? { ...o, status: newStatus } : o
                        )
                      );
                      // backend update
                      try {
                        await fetch(`/api/order/${order._id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ status: newStatus }),
                        });
                      } catch (err) {
                        console.error("Failed to update status", err);
                      }
                    }}
                    className={`px-2 py-1 rounded text-white text-sm font-medium cursor-pointer
      ${
        order.status === "pending"
          ? "bg-yellow-500"
          : order.status === "shipping"
          ? "bg-blue-500"
          : order.status === "delivered"
          ? "bg-green-500"
          : order.status === "canceled"
          ? "bg-red-500"
          : "bg-gray-500"
      }
    `}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>

                <td className="p-4 flex gap-2">
                  <Link
                    href={`/dashboard/orders/${order._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </Link>

                  <button
                    className="text-red-500 hover:text-red-800"
                    onClick={async () => {
                      if (
                        !confirm("Are you sure you want to delete this order?")
                      )
                        return;
                      try {
                        await fetch(`/api/order/${order._id}`, {
                          method: "DELETE",
                        });
                        setOrders((prev) =>
                          prev.filter((o) => o._id !== order._id)
                        );
                      } catch (err) {
                        console.error("Failed to delete order", err);
                      }
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-6 text-center text-gray-500">No orders found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default Page;
