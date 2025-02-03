import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center transform transition-transform hover:scale-105">
        <div className="mb-8">
          {/* Success Icon with Animation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-32 h-32 text-green-600 mx-auto animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-wide">
          Payment Successful!
        </h2>
        <p className="text-lg text-gray-500 mb-8 px-6">
          Your payment has been processed successfully. Thank you for your purchase. We're excited to serve you again soon!
        </p>

        <div className="space-x-4 flex justify-center">
          {/* Button to View Orders */}
          <a
            href="/viewOrders"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition-all hover:scale-105 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Orders
          </a>

          {/* Button to Go to Homepage */}
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition-all hover:scale-105 hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
