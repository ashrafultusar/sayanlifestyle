"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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


  // 🔥 Calculate product total
  const productsTotal = order?.products?.reduce((sum, product) => {
    const regularTotal = product.regularPrice * product.quantity;

    const discountTotal =
      product.discountPrice && product.discountPrice > 0
        ? product.discountPrice * product.quantity
        : 0;

    const finalPrice = discountTotal > 0 ? discountTotal : regularTotal;

    return sum + finalPrice;
  }, 0);

  // 🔥 Grand Total (Product Total + Courier Charge)
  const grandTotal = productsTotal + (order?.courierCharge || 0);


  console.log(order);
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
          <p><span className="font-semibold">Full Name:</span> {order?.fullName}</p>
          <p><span className="font-semibold">Email:</span> {order?.email}</p>
          <p><span className="font-semibold">Phone:</span> {order?.phone}</p>
          <p><span className="font-semibold">Location:</span> {order?.location}</p>
          <p><span className="font-semibold">Notes:</span> {order?.notes || "N/A"}</p>
        </div>

        {/* Address & Payment */}
        <div>
          <h2 className="text-lg font-medium mb-2 border-b">Shipping & Payment</h2>
          <p><span className="font-semibold">Address:</span> {order?.address}</p>
          <p><span className="font-semibold">City:</span> {order?.city}</p>
          <p><span className="font-semibold">Courier Charge:</span>  ৳ {order?.courierCharge}</p>
          <p><span className="font-semibold">Payment Method:</span> {order?.paymentMethod}</p>
          <p><span className="font-semibold">Status:</span> {order?.status}</p>
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Products</h2>
        <div className="space-y-4">
          {order?.products?.map((product) => {
            const regularTotal = product.regularPrice * product.quantity;

            const discountTotal =
              product.discountPrice && product.discountPrice > 0
                ? product.discountPrice * product.quantity
                : 0;

            const finalPrice = discountTotal > 0 ? discountTotal : regularTotal;

            return (
              <div
                key={product?.id}
                className="flex items-center gap-4 border border-gray-300 rounded-lg p-3"
              >
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-semibold">{product?.title}</p>
                  <p>Size: {product?.size}</p>
                  <p>Quantity: {product?.quantity}</p>
                </div>

                <div className="text-right">
                  {/* Discount price exists */}
                  {discountTotal > 0 ? (
                    <>
                      <p className="font-semibold">${finalPrice}</p>
                      <p className="text-sm text-gray-400 line-through">${regularTotal}</p>
                    </>
                  ) : (
                    <p className="font-semibold"> ৳{finalPrice}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="border-t pt-4 flex justify-end flex-col items-end space-y-2">
        <p className="text-lg font-semibold">Products Total:  ৳{productsTotal}</p>
        <p className="text-lg font-semibold">Courier Charge:  ৳{order?.courierCharge}</p>
        <p className="text-xl font-bold">Grand Total:  ৳{grandTotal}</p>
      </div>

      <div className="text-right mt-4 text-gray-400 text-sm">
        <p>Created At: {new Date(order?.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(order?.updatedAt).toLocaleString()}</p>
      </div>

      <Link className="bg-red-300 px-3 py-2 rounded text-black mt-4 inline-block" href={'/dashboard/orders'}>
        Back
      </Link>
    </div>
  );
}
