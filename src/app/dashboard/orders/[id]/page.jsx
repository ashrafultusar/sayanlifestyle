"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${id}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data.data);
      } catch (err) {
        console.error(err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-black border border-slate-300 rounded-sm mt-8">
      
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <p className=" mt-1">{order?.orderId}</p>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-medium mb-2 border-b">Customer Info</h2>
          <p>
            <span className="font-semibold">Full Name:</span> {order?.fullName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {order?.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {order?.phone}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {order?.location}
          </p>
          <p>
            <span className="font-semibold">Notes:</span>{" "}
            {order?.notes || "N/A"}
          </p>
        </div>

        {/* Address & Payment */}
        <div>
          <h2 className="text-lg font-medium mb-2 border-b">
            Shipping & Payment
          </h2>
          <p>
            <span className="font-semibold">Address:</span> {order?.address}
          </p>
          <p>
            <span className="font-semibold">City:</span> {order?.city}
          </p>
          <p>
            <span className="font-semibold">Courier Charge:</span> $
            {order?.courierCharge}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {order?.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span>{order?.status}</span>
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Products</h2>
        <div className="space-y-4">
          {order?.products?.map((product) => (
            <div
              key={product?._id}
              className="flex items-center gap-4 border border-gray-300 rounded-lg p-3"
            >
              <img
                src={product?.image}
                alt={product?.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{product?.title}</p>
                <p className="">Size: {product?.size}</p>
                <p className="">Quantity: {product?.quantity}</p>
              </div>
              <div>
                <p className="font-semibold">${product?.discountPrice}</p>
                {product?.discountPrice < product?.price && (
                  <p className="text-sm text-gray-400 line-through">
                    ${product?.price}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="border-t pt-4 flex justify-end space-x-6">
        <p className="text-lg font-semibold">
          Total Amount: ${order?.totalAmount}
        </p>
      </div>

      <div className="text-right mt-4 text-gray-400 text-sm">
        <p>Created At: {new Date(order?.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(order?.updatedAt).toLocaleString()}</p>
      </div>
    
      <Link className="bg-red-300 px-3 py-2 rounded text-black" href={'/dashboard/orders'}>Back </Link>
    
    </div>
  );
}
