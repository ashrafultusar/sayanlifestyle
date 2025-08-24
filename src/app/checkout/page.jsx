"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

  const [deliveryCharge, setDeliveryCharge] = useState({
    insideDhaka: 0,
    outsideDhaka: 0,
  });

  // Fetch delivery charges from API
  useEffect(() => {
    const fetchCharge = async () => {
      try {
        const res = await fetch("/api/deliveryCharge");
        if (!res.ok) throw new Error("Failed to fetch delivery charge");
        const data = await res.json();
        setDeliveryCharge({
          insideDhaka: data.data.insideDhaka,
          outsideDhaka: data.data.outsideDhaka,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCharge();
  }, []);

  // Load cart from localStorage
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

  // Calculate total amount including delivery charges
  const courierCharge =
    location === "inside" ? deliveryCharge.insideDhaka : deliveryCharge.outsideDhaka;

  const totalAmount = productInfo.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) + courierCharge;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      productInfo.length === 0
    ) {
      toast.error("Please fill all required fields and select products");
      return;
    }

    const order = {
      products: productInfo,
      customer: { ...formData, courierLocation: location },
      courierCharge,
      totalAmount,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Order failed");
      const result = await res.json();

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

      toast.success(`Order placed successfully!`);
      router.push(
        `/order-success?mongoId=${result.id}&orderId=${result.orderId}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleRemoveProduct = (indexToRemove) => {
    const updated = productInfo.filter((_, idx) => idx !== indexToRemove);
    setProductInfo(updated);
    localStorage.setItem("checkoutData", JSON.stringify(updated));
  };

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
          {/* Billing */}
          <div className="lg:col-span-2 border border-gray-300 p-6 space-y-10 rounded-md">
            <div>
              <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border px-2 py-2 rounded-sm"
                />
                <input
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border px-2 py-2 rounded-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className="md:col-span-2 border px-2 py-2 rounded-sm"
                />
                <input
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="md:col-span-2 border px-2 py-2 rounded-sm"
                />
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border px-2 py-2 rounded-sm"
                />
                <select disabled className="border px-2 py-2 rounded-sm">
                  <option>Bangladesh</option>
                </select>
                <textarea
                  name="notes"
                  placeholder="Order Notes (optional)"
                  value={formData.notes}
                  onChange={handleChange}
                  className="md:col-span-2 border px-2 py-2 rounded-sm"
                />
              </div>
            </div>

            {/* Courier Location */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Courier Location</h3>
              <label className="flex gap-2">
                <input
                  type="radio"
                  value="inside"
                  checked={location === "inside"}
                  onChange={() => setLocation("inside")}
                />
                Inside Dhaka (৳{deliveryCharge.insideDhaka})
              </label>
              <label className="flex gap-2">
                <input
                  type="radio"
                  value="outside"
                  checked={location === "outside"}
                  onChange={() => setLocation("outside")}
                />
                Outside Dhaka (৳{deliveryCharge.outsideDhaka})
              </label>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Option</h3>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" defaultChecked />
                <span>Cash on Delivery</span>
              </label>
              <button
                type="submit"
                className="bg-black text-white py-2 px-6 rounded cursor-pointer hover:bg-gray-800 mt-4"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 border border-gray-300 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Your Order</h3>
            {productInfo.length > 0 ? (
              <>
                {productInfo.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border border-gray-300 rounded p-2"
                  >
                    <button
                      onClick={() => handleRemoveProduct(idx)}
                      className="mr-3 cursor-pointer text-red-500 text-lg"
                    >
                      ✕
                    </button>
                    <img
                      src={item?.image}
                      alt={item?.title}
                      className="w-16 h-16 object-cover mr-3"
                    />
                    <div className="flex-1">
                      <p>{item.title}</p>
                      <p>Price: ৳{item.discountPrice}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="ml-4 font-semibold">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <span>Courier Charges</span>
                  <span>৳{courierCharge}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>৳{totalAmount}</span>
                </div>
              </>
            ) : (
              <p>No product info found</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;


