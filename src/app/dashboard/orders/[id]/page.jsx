"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const { id } = params; // order id from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/order/${id}`);
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="mb-4">
        <strong>Order ID:</strong> {order._id}
      </div>
      <div className="mb-4">
        <strong>Customer Name:</strong> {order.customer?.fullName}
      </div>
      <div className="mb-4">
        <strong>Phone:</strong> {order.customer?.phone}
      </div>
      <div className="mb-4">
        <strong>Total Amount:</strong> ₹{order.totalAmount}
      </div>
      <div className="mb-4">
        <strong>Status:</strong> {order.status}
      </div>
      <div className="mb-4">
        <strong>Payment Method:</strong> {order.paymentMethod}
      </div>
      <div className="mb-4">
        <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
      </div>
      <div className="mb-4">
        <strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleString()}
      </div>

      {/* Add more fields as needed */}
    </div>
  );
};

export default page;
