"use client";

export default function OrderSuccessPage() {
  return (
    <div className="text-black container mx-auto p-6 border border-gray-300 rounded my-10">
      <div className="bg-green-50 text-green-700 p-4 text-center mb-6 rounded">
        Thank you. Your order has been received.
      </div>

      <div className="bg-gray-100 p-4 rounded mb-6 text-sm text-gray-800">
        <p>
          Our team is reviewing your order and will start processing it as soon
          as possible.
        </p>
        <p className="mt-2">
          You will receive all order details via your registered email.
        </p>
        <p className="mt-2 font-semibold">
          For any inquiries, feel free to contact us: support@example.com
        </p>
        <p className="mt-2 font-medium">
          Thank you for your trust and support.
        </p>
      </div>
      {/* Bangla Version */}
      <div className="bg-gray-100 p-4 rounded text-sm text-gray-800">
        <p>
          আমাদের টিম আপনার অর্ডারটি যাচাই করছে এবং যত দ্রুত সম্ভব প্রক্রিয়াকরণ
          শুরু করবে।
        </p>
        <p className="mt-2">
          আপনি অর্ডার সম্পর্কিত সকল তথ্য আপনার ইমেইলে পাবেন।
        </p>
        <p className="mt-2 font-semibold">
          যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন:
          support@example.com
        </p>
        <p className="mt-2 font-medium">
          আপনার বিশ্বাস ও সমর্থনের জন্য ধন্যবাদ।
        </p>
      </div>
      {/* <div className="grid grid-cols-2 md:grid-cols-5 text-sm border-b pb-4 mb-4">
        <div>
          <p className="font-semibold">Order number:</p>
          <p>{'order._id'}</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
      
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{'order.customer.email'}</p>
        </div>
        <div>
          <p className="font-semibold">Total:</p>
          <p>৳{'order.totalAmount'}</p>
        </div>
        <div>
          <p className="font-semibold">Payment method:</p>
          <p className="font-bold text-red-600">CASH</p>
        </div>
      </div> */}

      {/* <h2 className="font-bold text-lg mb-2">ORDER DETAILS</h2>
      <div className="border rounded text-sm">
        <div className="flex justify-between bg-gray-50 px-4 py-2 font-semibold">
          <span>PRODUCT</span>
          <span>TOTAL</span>
        </div>
      
        <div className="flex justify-between px-4 py-2 border-t font-bold">
          <span>Total</span>
          <span>৳{'order.totalAmount'}</span>
        </div>
        <div className="px-4 py-2 border-t">
          <span className="font-semibold">NOTE:</span> {'order.customer.notes'}
        </div>
      </div> */}
    </div>
  );
}
