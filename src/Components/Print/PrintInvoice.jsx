"use client";
import React from "react";

const PrintInvoice = ({ order }) => {
  if (!order) {
    return (
      <div className="p-5 text-center text-gray-700">
        No Order Found
      </div>
    );
  }

  const {
    orderId,
    fullName,
    phone,
    email,
    address,
    city,
    paymentMethod,
    status,
    createdAt,
    courierCharge,
    discountPrice,
    products = [],
  } = order;

  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = courierCharge || 0;
  const discount = discountPrice || 0;
  const grandTotal = subtotal - discount + deliveryCharge;

  return (
    <div className="max-w-[794px] mx-auto p-8 text-[12px] text-black font-sans">
      {/* Header */}
      <div className="text-center mb-5">
        <img src="/logo.png" alt="Logo" className="w-32 mx-auto" />
        <h2 className="text-base font-bold mt-1">CUSTOMER COPY</h2>
        <h1 className="text-sm font-bold">SAYAN LIFESTYLE</h1>
        <p className="text-[11px] leading-tight">
        As Salam Bohumukhi Somobay Somity Building, <br />4th Floor, Plot No-79, Block-A, Zoo Road, Mirpur-2, Dhaka 1216
        </p>
        <p className="text-[11px] leading-tight">Dhaka 1216</p>
      </div>

      {/* Customer + Order Info */}
      <div className="flex justify-between mb-5 gap-4">
        {/* Customer Info */}
        <div className="w-1/2">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="font-bold py-1 w-1/3">Order Id:</td>
                <td>{orderId || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Name:</td>
                <td>{fullName || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Phone:</td>
                <td>{phone || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Email:</td>
                <td>{email || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Address:</td>
                <td>{address || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">City:</td>
                <td>{city || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Order Info */}
        <div className="w-1/2">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="font-bold py-1 w-2/5">Payment Method:</td>
                <td>{paymentMethod || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Order Status:</td>
                <td className="capitalize">{status || "pending"}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Delivery Charge:</td>
                <td>{deliveryCharge.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Discount:</td>
                <td>{discount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Order Date:</td>
                <td>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ✅ Product Table (Updated Like Image) */}
      <table className="w-full border border-black border-collapse text-[12px] mb-3">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border border-black p-1 w-[5%]">Sl. No.</th>
            <th className="border border-black p-1 w-[30%] text-left">
              Product
            </th>
            <th className="border border-black p-1 w-[20%] text-left">Shop</th>
            <th className="border border-black p-1 w-[10%]">Variant</th>
            <th className="border border-black p-1 w-[8%]">QTY</th>
            <th className="border border-black p-1 w-[10%] text-right">
              Price
            </th>
            <th className="border border-black p-1 w-[12%] text-right">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products?.map((item, index) => (
              <tr key={index}>
                <td className="border border-black p-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-black p-1">
                  {item?.title || "N/A"}
                </td>
                <td className="border border-black p-1">
                  FDL Mobile Store for MAR21
                </td>
                <td className="border border-black p-1 text-center">
                  {item?.size || "N/A"}
                </td>
                <td className="border border-black p-1 text-center">
                  {item?.quantity}
                </td>
                <td className="border border-black p-1 text-right">
                  {item?.price.toFixed(2)}
                </td>
                <td className="border border-black p-1 text-right">
                  {(item?.price * item?.quantity).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center p-2 border border-black text-gray-500"
              >
                No products found.
              </td>
            </tr>
          )}

          {/* Summary Rows */}
          <tr className="">
            <td colSpan="6" className="border border-black p-1 text-left">
              Total
            </td>
            <td className="border border-black p-1 text-right">
              {subtotal?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan="6" className="border border-black p-1 text-left">
              Discount
            </td>
            <td className="border border-black p-1 text-right">
              -{discount?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan="6" className="border border-black p-1 text-left">
              Subtotal
            </td>
            <td className="border border-black p-1 text-right">
              {(subtotal - discount).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan="6" className="border border-black p-1 v">
              Delivery Charge
            </td>
            <td className="border border-black p-1 text-right">
              {deliveryCharge?.toFixed(2)}
            </td>
          </tr>
          <tr className="font-bold bg-gray-50">
            <td colSpan="6" className="border border-black p-1 text-left">
              Grand Total
            </td>
            <td className="border border-black p-1 text-right">
              {grandTotal?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Note */}
      <p className="text-[11px] my-5">
        Note: Shipping charges may vary depending on courier location and
        weight.
      </p>

      {/* Signatures */}
      <div className="flex justify-between mt-12">
        <div className="w-2/5 text-center border-t border-black pt-1">
          <p className="text-xs">CUSTOMER</p>
        </div>
        <div className="w-2/5 text-center border-t border-black pt-1">
          <p className="text-xs">RIDER</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <p className="text-[11px]">
          Powered by sayan lifestyle.
        </p>
      </div>
    </div>
  );
};

export default PrintInvoice;
