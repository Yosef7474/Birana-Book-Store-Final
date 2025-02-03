import React, { useContext, useState } from "react";
import { useGetUserOrdersQuery } from "../../redux/features/orders/orderApi";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";
import { AuthContext } from "../../context/AuthContext";

const UserOrders = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  
  const { data: orders, isLoading, isError } = useGetUserOrdersQuery(userEmail);

  const [timeframe, setTimeframe] = useState("today");

  if (isLoading) return <p className="text-center text-xl text-gray-600">Loading your orders...</p>;
  if (isError) return <p className="text-center text-xl text-red-600">Failed to fetch your orders.</p>;

  // Function to filter orders based on timeframe
  const filterOrders = (orders, timeframe) => {
    switch (timeframe) {
      case "today":
        return orders.filter(order => isToday(new Date(order.createdAt)));
      case "yesterday":
        return orders.filter(order => isYesterday(new Date(order.createdAt)));
      case "week":
        return orders.filter(order => isThisWeek(new Date(order.createdAt)));
      case "month":
        return orders.filter(order => isThisMonth(new Date(order.createdAt)));
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrders(orders, timeframe);

  // Sort orders in descending order based on creation date (latest first)
  const sortedOrders = filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10">Your Orders</h1>
      
      {/* Timeframe Filter */}
      <div className="flex justify-center mb-6 space-x-6">
        <button
          className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ${timeframe === "today" ? "bg-indigo-600 text-white shadow-lg transform scale-105" : "bg-white text-gray-800 hover:bg-indigo-50"}`}
          onClick={() => setTimeframe("today")}
        >
          Today
        </button>
        <button
          className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ${timeframe === "yesterday" ? "bg-indigo-600 text-white shadow-lg transform scale-105" : "bg-white text-gray-800 hover:bg-indigo-50"}`}
          onClick={() => setTimeframe("yesterday")}
        >
          Yesterday
        </button>
        <button
          className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ${timeframe === "week" ? "bg-indigo-600 text-white shadow-lg transform scale-105" : "bg-white text-gray-800 hover:bg-indigo-50"}`}
          onClick={() => setTimeframe("week")}
        >
          This Week
        </button>
        <button
          className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ${timeframe === "month" ? "bg-indigo-600 text-white shadow-lg transform scale-105" : "bg-white text-gray-800 hover:bg-indigo-50"}`}
          onClick={() => setTimeframe("month")}
        >
          This Month
        </button>
        <button
          className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ${timeframe === "all" ? "bg-indigo-600 text-white shadow-lg transform scale-105" : "bg-white text-gray-800 hover:bg-indigo-50"}`}
          onClick={() => setTimeframe("all")}
        >
          All Orders
        </button>
      </div>

      <div className="space-y-8">
        {sortedOrders && sortedOrders.length > 0 ? (
          sortedOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold text-indigo-600">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">{format(new Date(order.createdAt), "MMMM d, yyyy h:mm a")}</p>
              </div>
              <p className="text-lg font-medium text-gray-700">Books:</p>
              <ul className="space-y-2 pl-6 text-gray-600">
                {order.books.map((book, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{book.title}</span>
                    <span className="text-gray-700">Qty: {book.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold text-gray-800">Total: ${order.totalAmount}</p>
              <p className={`mt-2 text-sm font-medium text-green-600 ${order.paymentStatus}`}>
                <strong>Status:</strong> {order.paymentStatus}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500">No orders found for this timeframe.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
