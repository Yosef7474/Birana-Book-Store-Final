import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <div className="mb-6">
          {/* Success Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-24 h-24 text-green-500 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for your purchase.
        </p>

        <div className="space-x-4">
          {/* Button to View Orders */}
          <a
            href="/viewOrders"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Orders
          </a>

          {/* Button to Go to Homepage */}
          <a
            href="/"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
