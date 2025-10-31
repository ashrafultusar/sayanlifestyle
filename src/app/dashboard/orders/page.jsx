"use client";

import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import { IoPrintSharp } from "react-icons/io5";

import Pagination from "@/Components/Shared/Pagination";
import PrintInvoice from "@/Components/Print/PrintInvoice";

const Page = () => {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("all");

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const [selectedOrderToPrint, setSelectedOrderToPrint] = useState(null);

  const fetchOrders = async () => {
    const params = new URLSearchParams({
      search,
      filterDate,
      from,
      to,
      status,
      page: currentPage,
      limit: pageSize,
    });
    try {
      const res = await fetch(`/api/order?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDate, from, to,status]);

  useEffect(() => {
    fetchOrders();
  }, [search, filterDate, from, to,status, currentPage]);

  const totalPages = Math.ceil(total / pageSize);

  const handlePrint = (order) => {
    setSelectedOrderToPrint(order);

    setTimeout(() => {
      window.print();

      setSelectedOrderToPrint(null);
    }, 100);
  };

  const handleDelete = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      alert("Order deleted successfully.");
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("Failed to delete order.");
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === order._id ? { ...o, status: newStatus } : o))
    );
    try {
      const res = await fetch(`/api/order/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Status update failed");
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };
console.log(orders);
  return (
    <div className="text-black">
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }

        .print-only {
          display: none;
        }
      `}</style>

      <div className="p-8 no-print">
        <h1 className="text-3xl font-bold mb-6">Order Dashboard</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
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

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order._id}
                  className=" last:border-b-0 odd:bg-white even:bg-gray-300 hover:bg-gray-100 transition"
                >
                  <td className="p-4">{order?.orderId}</td>
                  <td className="p-4">
                    ${(order?.totalAmount || 0).toFixed(2)}
                  </td>
                  <td className="p-4">{order?.customer?.fullName}</td>
                  <td className="p-4">{order?.customer?.phone}</td>

                  <td className="p-4">
                    <select
                      value={order.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(order, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-white text-sm font-medium cursor-pointer ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "shipping"
                          ? "bg-blue-500"
                          : order.status === "delivered"
                          ? "bg-green-500"
                          : order.status === "canceled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipping">Shipping</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>

                  <td className="p-4 flex gap-2 text-xl">
                    <Link
                      href={`/dashboard/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </Link>

                    <button
                      className="text-red-500 cursor-pointer hover:text-red-800"
                      onClick={() => handleDelete(order._id)}
                    >
                      <MdDeleteForever />
                    </button>

                    <button
                      className="cursor-pointer text-green-600 hover:text-green-800"
                      onClick={() => handlePrint(order)}
                    >
                      <IoPrintSharp />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No orders found.
            </div>
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

      {selectedOrderToPrint && (
        <div className="print-only">
          <PrintInvoice order={selectedOrderToPrint} />
        </div>
      )}
    </div>
  );
};

export default Page;
