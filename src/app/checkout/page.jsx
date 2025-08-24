"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const CheckoutPage = () => {
  const [location, setLocation] = useState("inside");
  const [productInfo, setProductInfo] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutData");
    if (storedData) {
      setProductInfo(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const courierCharge = (location) => (location === "inside" ? 60 : 120);

  // Total calculation for all products
  const totalAmount = productInfo.reduce(
    (acc, item) =>
      acc + item.price * item.quantity + courierCharge(item.courierLocation),
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      productInfo.length === 0
    ) {
      alert("Please fill in all required fields and have at least one product.");
      return;
    }
  
    const order = {
      products: productInfo,
      customer: formData,
      totalAmount,
    };
  
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!res.ok) throw new Error("Order failed");
  
      const result = await res.json();
  
      // ✅ Clear data
      localStorage.removeItem("checkoutData");
      setProductInfo([]);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        notes: "",
      });
  
      toast.success(`✅ Order placed! Order ID: ${result.orderId}`);
  
      // ✅ Redirect after successful order
      router.push("/order-success");
  
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong.");
    }
  };
  
  // Add this handler inside your component
  const handleRemoveProduct = (indexToRemove) => {
    const updatedProducts = productInfo.filter(
      (_, idx) => idx !== indexToRemove
    );
    setProductInfo(updatedProducts);
    localStorage.setItem("checkoutData", JSON.stringify(updatedProducts));
  };

  console.log(productInfo);
  return (
    <div className="max-w-7xl mx-auto pb-10 text-black">

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Checkout
        </h2>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {/* Billing Section */}
          <div className="lg:col-span-2 border border-gray-300 p-6 space-y-10 rounded-md">
            <div>
              <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address (optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input md:col-span-2 border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input md:col-span-2 border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm"
                />
                <select
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm"
                  disabled
                >
                  <option>Bangladesh</option>
                </select>
                <textarea
                  name="notes"
                  placeholder="Order Notes (optional)"
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm md:col-span-2"
                  rows="3"
                />
              </div>
            </div>

            {/* Courier Location */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Courier Location</h3>
              <div className="flex flex-col gap-2 text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="location"
                    value="inside"
                    checked={location === "inside"}
                    onChange={() => setLocation("inside")}
                  />
                  Inside Dhaka (৳60)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="location"
                    value="outside"
                    checked={location === "outside"}
                    onChange={() => setLocation("outside")}
                  />
                  Outside Dhaka (৳120)
                </label>
              </div>
            </div>

            {/* Payment + Submit */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Option</h3>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" defaultChecked />
                <span>Cash on Delivery</span>
              </label>
              <p className="text-sm text-gray-600 mt-2">
                By placing order, you agree to our{" "}
                <a href="#" className="underline text-blue-600">
                  Terms
                </a>
                ,{" "}
                <a href="#" className="underline text-blue-600">
                  Return
                </a>{" "}
                and{" "}
                <a href="#" className="underline text-blue-600">
                  Privacy
                </a>{" "}
                policies.
              </p>
              <button type="submit" className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 mt-4 transition-all">
  Place Order
</button>

            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 border border-gray-300 rounded-md shadow-sm">
  <h3 className="text-xl font-semibold mb-4">Your Order</h3>

  {productInfo?.length > 0 ? (
    <>
      {productInfo.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border-b border-gray-200 py-3"
        >
          {/* Remove button */}
          <button
            onClick={() => handleRemoveProduct(idx)}
            className="text-gray-500 cursor-pointer hover:text-red-600 mr-3 text-lg"
            aria-label={`Remove ${item.title}`}
          >
            ✕
          </button>

          {/* Product image */}
          <img
            src={item?.image}
            alt={item?.title}
            className="w-16 h-16 object-cover rounded mr-3"
          />

          {/* Product details */}
          <div className="flex-1">
            <p className="font-medium text-gray-800">
              {item?.title}
            </p>
<p>Price: ৳ {item?.discountPrice}</p>
           <p>Size: {item?.size}</p>
          </div>

          {/* Price */}
          <p className="font-semibold text-gray-800 ml-4">
          ৳{item.price * item.quantity}
          </p>
        </div>
      ))}

      {/* Courier charges */}
      <div className="flex justify-between mt-4 text-gray-700">
        <span>Courier Charges</span>
        <span>
          ৳
          {productInfo.reduce(
            (acc, item) => acc + courierCharge(item.courierLocation),
            0
          )}
        </span>
      </div>
      <hr className="my-3" />

      {/* Total */}
      <div className="flex justify-between font-bold">
        <p>Total:</p>
        <p>৳{totalAmount}</p>
      </div>
    </>
  ) : (
    <p className="text-sm text-red-500">No product info found.</p>
  )}
</div>

        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
