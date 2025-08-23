"use client";

import React, { useState } from "react";

const CheckoutPage = () => {
  const [location, setLocation] = useState("inside");
  const productPrice = 480;
  const courierCharge = location === "inside" ? 60 : 120;
  const total = productPrice + courierCharge;

  return (
    <div
      className="text-black max-w-7xl mx-auto
  py-10"
    >
      {/* Breadcrumb/Progress Bar */}

      <div
        className="bg-gray-400 px-12 mb-2
         py-4 text-center text-lg font-semibold tracking-wide text-gray-800"
      >
        <span className="text-gray-800">SHOPPING CART</span>
        <span className="mx-2">→</span>
        <span className="underline font-bold">CHECKOUT</span>
        <span className="mx-2">→</span>
        <span className="text-gray-800">ORDER COMPLETE</span>
      </div>

      <div className=" bg-white rounded-lg p-6 ">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Billing + Payment */}
          <div className="lg:col-span-2 border border-gray-300 p-6 space-y-10 rounded-md">
            {/* Billing Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address (optional)"
                  className="form-input md:col-span-2 border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  className="form-input md:col-span-2 border border-gray-300 px-2 py-2 rounded-sm"
                />
                <input type="text" placeholder="City" className="form-input border border-gray-300 px-2 py-2 rounded-sm" />
                <select className="form-input border border-gray-300 px-2 py-2 rounded-sm">
                  <option>Bangladesh</option>
                </select>
                <textarea
                  placeholder="Order Notes (optional)"
                  className="form-input border border-gray-300 px-2 py-2 rounded-sm md:col-span-2"
                  rows="3"
                />
              </form>
            </div>

            {/* Courier Option */}
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

            {/* Payment Options */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Option</h3>
              <div className="space-y-3">
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

                <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 mt-4 transition-all">
                  Place Order
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-gray-50 p-6 border border-gray-300 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Your Order</h3>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>“Lime Flow the Vibrant Energy”</span>
              <span>৳{productPrice}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>
                Courier Charge (
                {location === "inside" ? "Inside Dhaka" : "Outside Dhaka"})
              </span>
              <span>৳{courierCharge}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
