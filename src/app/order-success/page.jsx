import { FaFacebook, FaSmile } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";

const page = () => {
  return (
    <div className="text-black max-w-4xl mx-auto p-6 border border-gray-300 rounded-sm my-10">
      <div className="border border-green-300 bg-green-50 text-green-700 p-4 rounded text-center mb-6">
        Thank you. Your order has been received.
      </div>

      {/* Order info */}
      <div className="grid grid-cols-2 md:grid-cols-5 text-sm border-b pb-4 mb-4">
        <div>
          <p className="font-semibold">Order number:</p>
          <p>230823050054470</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
          <p>August 23, 2025</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>fydoowir@mailinator.com</p>
        </div>
        <div>
          <p className="font-semibold">Total:</p>
          <p>৳11,040.00</p>
        </div>
        <div>
          <p className="font-semibold">Payment method:</p>
          <p className="font-bold text-red-600">CASH</p>
        </div>
      </div>
      <p className="mb-6">Pay with cash upon delivery.</p>

      {/* Order Details */}
      <h2 className="font-bold text-lg mb-2">ORDER DETAILS</h2>
      <div className="border border-gray-200 rounded overflow-hidden text-sm">
        <div className="flex justify-between bg-gray-50 px-4 py-2 font-semibold">
          <span>PRODUCT</span>
          <span>TOTAL</span>
        </div>
        <div className="flex justify-between px-4 py-2 border-b">
          <div>
            Lime Flow the Vibrant Energy – NS0031386 × L × 23
            <p className="text-xs">Size: L</p>
          </div>
          <span>৳11,040.00</span>
        </div>
        <div className="px-4 py-2">
          Thank you for your purchase and choosing NOGOR as your online shop{" "}
          <FaSmile className="inline text-yellow-500" />
        </div>
        <div className="flex justify-between px-4 py-2 border-t">
          <span>Subtotal</span>
          <span>৳11,040.00</span>
        </div>
        <div className="flex justify-between px-4 py-2 border-t">
          <span>Shipping</span>
          <span>Free Shipping</span>
        </div>
        <div className="flex justify-between px-4 py-2 border-t">
          <span>Payment method</span>
          <span>CASH</span>
        </div>
        <div className="flex justify-between px-4 py-2 border-t font-bold">
          <span>Total</span>
          <span>৳11,040.00</span>
        </div>
        <div className="px-4 py-2 border-t">
          <span className="font-semibold">NOTE:</span> Mollitia labore fuga
        </div>
      </div>

    

      {/* Billing Address */}
      <h2 className="font-bold text-lg mt-8 mb-2">BILLING ADDRESS</h2>
      <p>Evelyn</p>
      <p>92 West Clarendon Freeway</p>
      <p>Narsingdi</p>
      <p>+12058224286</p>
      <p>fydoowir@mailinator.com</p>
    </div>
  );
};

export default page;
