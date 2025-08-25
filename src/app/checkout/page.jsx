"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const [location, setLocation] = useState("inside");
  const [productInfo, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const [deliveryCharge, setDeliveryCharge] = useState({
    insideDhaka: 0,
    outsideDhaka: 0,
  });

  const router = useRouter();

  // Fetch delivery charges
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/deliveryCharge");
        const data = await res.json();
        setDeliveryCharge({
          insideDhaka: data?.data?.insideDhaka ?? 0,
          outsideDhaka: data?.data?.outsideDhaka ?? 0,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load delivery charges");
      }
    })();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("checkoutData");
      if (storedData) {
        setProductInfo(JSON.parse(storedData));
      }
    } catch {
      // ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveProduct = (index) => {
    const updated = productInfo.filter((_, i) => i !== index);
    setProductInfo(updated);
    localStorage.setItem("checkoutData", JSON.stringify(updated));
  };

  const courierCharge = useMemo(
    () => (location === "inside" ? deliveryCharge.insideDhaka : deliveryCharge.outsideDhaka),
    [location, deliveryCharge]
  );

  const productsSubtotal = useMemo(
    () =>
      productInfo.reduce(
        (acc, item) => acc + ((item.discountPrice ?? item.price) * (item.quantity ?? 1)),
        0
      ),
    [productInfo]
  );

  const totalAmount = useMemo(() => productsSubtotal + courierCharge, [productsSubtotal, courierCharge]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!productInfo?.length) {
      toast.error("No items in your order.");
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast.error("Please fill required fields (Name, Phone, Address, City).");
      return;
    }

    const orderData = {
      ...formData,
      location,
      products: productInfo,
      courierCharge,
      totalAmount,
      paymentMethod: "Cash on Delivery",
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const resData = await res.json();

      if (!res.ok) {
        toast.error(resData?.error || "Failed to place order!");
        return;
      }

      toast.success("Order placed successfully!");
      localStorage.removeItem("checkoutData");
      router.push("/order-success");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 text-center">Loading checkout…</div>
    );
  }
console.log(productInfo);
  return (
    <div className="max-w-7xl mx-auto pb-10 text-black">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h2>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Billing */}
          <div className="lg:col-span-2 border border-gray-300 p-6 space-y-10 rounded-md">
            <div>
              <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="fullName" placeholder="Full Name*" value={formData.fullName} onChange={handleChange} className="border px-2 py-2 rounded-sm" required />
                <input name="phone" placeholder="Mobile Number*" value={formData.phone} onChange={handleChange} className="border px-2 py-2 rounded-sm" required />
                <input type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleChange} className="md:col-span-2 border px-2 py-2 rounded-sm" />
                <input name="address" placeholder="Street Address*" value={formData.address} onChange={handleChange} className="md:col-span-2 border px-2 py-2 rounded-sm" required />
                <input name="city" placeholder="City*" value={formData.city} onChange={handleChange} className="border px-2 py-2 rounded-sm" required />
                <select disabled className="border px-2 py-2 rounded-sm"><option>Bangladesh</option></select>
                <textarea name="notes" placeholder="Order Notes (optional)" value={formData.notes} onChange={handleChange} className="md:col-span-2 border px-2 py-2 rounded-sm" />
              </div>
            </div>

            {/* Courier Location */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Courier Location</h3>
              <label className="flex gap-2">
                <input type="radio" value="inside" checked={location === "inside"} onChange={() => setLocation("inside")} />
                Inside Dhaka (৳{deliveryCharge.insideDhaka})
              </label>
              <label className="flex gap-2">
                <input type="radio" value="outside" checked={location === "outside"} onChange={() => setLocation("outside")} />
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
              <button type="submit" className="bg-black text-white py-2 px-6 rounded cursor-pointer hover:bg-gray-800 mt-4">
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
                  <div key={idx} className="flex items-center justify-between border border-gray-300 rounded p-2 mb-2">
                    <button type="button" onClick={() => handleRemoveProduct(idx)} className="mr-3 cursor-pointer text-red-500 text-lg" aria-label="Remove">✕</button>
                    <img src={item?.image} alt={item?.title} className="w-16 h-16 object-cover mr-3" />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p>Price: ৳{item.discountPrice ?? item.price}</p>
                      {item.size ? <p>Size: {item.size}</p> : null}
                      <p>Qty: {item.quantity ?? 1}</p>
                    </div>
                    <p className="ml-4 font-semibold">৳{(item.discountPrice ?? item.price) * (item.quantity ?? 1)}</p>
                  </div>
                ))}
                <div className="flex justify-between mt-4"><span>Subtotal</span><span>৳{productsSubtotal}</span></div>
                <div className="flex justify-between"><span>Courier Charges</span><span>৳{courierCharge}</span></div>
                <div className="flex justify-between font-bold mt-2"><span>Total</span><span>৳{totalAmount}</span></div>
              </>
            ) : (
              <p>No product info found</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
