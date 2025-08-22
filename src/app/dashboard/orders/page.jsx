"use client";

import { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [orders, setOrders] = useState([
    {
      id: "5386764927",
      paymentMethod: "cash",
      orderDate: "2020-09-09T00:01:41",
      deliveryDate: "September 12th 2020",
      status: "pending",
      total: 2000,
    },
    {
      id: "7039483769",
      paymentMethod: "cash",
      orderDate: "2020-09-09T00:40:48",
      deliveryDate: "September 12th 2020",
      status: "processing",
      total: 2000,
    },
    {
      id: "1577638920",
      paymentMethod: "cash",
      orderDate: "2020-09-09T01:15:28",
      deliveryDate: "September 12th 2020",
      status: "pending",
      total: 4132,
    },
    {
      id: "9143518234",
      paymentMethod: "cash",
      orderDate: "2020-09-08T10:27:46",
      deliveryDate: "September 12th 2020",
      status: "processing",
      total: 3430,
    },
    {
      id: "1300843978",
      paymentMethod: "cash",
      orderDate: "2020-09-08T10:24:46",
      deliveryDate: "September 12th 2020",
      status: "processing",
      total: 3430,
    },
    {
      id: "4348485767",
      paymentMethod: "cash",
      orderDate: "2020-09-07T18:14:35",
      deliveryDate: "September 12th 2020",
      status: "processing",
      total: 10,
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.includes(searchTerm);
    const matchesDate = filterDate
      ? order.orderDate.startsWith(filterDate)
      : true;
    return matchesSearch && matchesDate;
  });

  const formatDateDisplay = (isoString) =>
    new Date(isoString).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });

  return (
    <div className="p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Order Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-md hover:scale-105 transform transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm uppercase">Order Pending</div>
              <div className="text-3xl font-bold mt-1">
                {orders.filter((o) => o.status === "pending").length}
              </div>
            </div>
            <div className="text-4xl opacity-30">🕒</div>
          </div>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl shadow-md hover:scale-105 transform transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm uppercase">Order Cancel</div>
              <div className="text-3xl font-bold">
                {orders.filter((o) => o.status === "canceled").length}
              </div>
            </div>
            <div className="text-4xl opacity-30">❌</div>
          </div>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md hover:scale-105 transform transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm uppercase">Order Process</div>
              <div className="text-3xl font-bold">
                {orders.filter((o) => o.status === "processing").length}
              </div>
            </div>
            <div className="text-4xl opacity-30">🔄</div>
          </div>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-md hover:scale-105 transform transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm uppercase">Today Income</div>
              <div className="text-3xl font-bold">₹9568.00</div>
            </div>
            <div className="text-4xl opacity-30">💰</div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
      <input
            type="text"
            placeholder="Search by Order ID"
            className="border rounded px-3 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
     
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
         
      
      </div>

      {/* Orders Table */}
      <div className="rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Order Date</th>
              <th className="p-4">Delivery Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className=" hover:bg-gray-50">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.paymentMethod}</td>
                <td className="p-4">{formatDateDisplay(order.orderDate)}</td>
                <td className="p-4">{order.deliveryDate}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`px-2 py-1 rounded text-white text-sm font-medium cursor-pointer
                      ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "delivered"
                          ? "bg-blue-500"
                          : order.status === "canceled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }
                    `}
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                    <option value="processing">Processing</option>
                  </select>
                </td>
                <td className="p-4">₹{order.total}</td>
                <td className="p-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye />
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="p-6 text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default page;
