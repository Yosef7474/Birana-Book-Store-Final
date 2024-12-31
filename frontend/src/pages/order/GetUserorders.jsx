import React, { useContext, useState } from "react";
import { useGetUserOrdersQuery } from "../../redux/features/orders/orderApi";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns"; 
import { AuthContext } from "../../context/AuthContext";

const UserOrders = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  
  const { data: orders, isLoading, isError } = useGetUserOrdersQuery(userEmail);

  const [timeframe, setTimeframe] = useState("today"); // State to handle selected timeframe

  if (isLoading) return <p>Loading your orders...</p>;
  if (isError) return <p>Failed to fetch your orders.</p>;

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
        return orders; // Return all orders if "all" timeframe is selected
    }
  };

  const filteredOrders = filterOrders(orders, timeframe);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      
      {/* Timeframe Filter */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${timeframe === "today" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTimeframe("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${timeframe === "yesterday" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTimeframe("yesterday")}
        >
          Yesterday
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${timeframe === "week" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTimeframe("week")}
        >
          This Week
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${timeframe === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTimeframe("month")}
        >
          This Month
        </button>
        <button
          className={`px-4 py-2 rounded ${timeframe === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTimeframe("all")}
        >
          All Orders
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="p-4 border-b">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {format(new Date(order.createdAt), "MMMM d, yyyy h:mm a")}</p>
              <p><strong>Books:</strong></p>
              <ul>
                {order.books.map((book, idx) => (
                  <li key={idx}>
                    {book.title} - Qty: {book.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Status:</strong> {order.paymentStatus}</p>
            </div>
          ))
        ) : (
          <p>No orders found for this timeframe.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
