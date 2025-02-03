import React, { useState } from "react";
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../../redux/features/orders/orderApi";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns"; // Import date-fns

const GetAllOrders = () => {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [alert, setAlert] = useState({ message: "", type: "" });

  if (isLoading) return <p className="text-center text-xl text-gray-300">Loading orders...</p>;
  if (isError) return <p className="text-center text-xl text-red-600">Error fetching orders.</p>;

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();

      setAlert({
        message: 'Order deleted successfully!',
        type: 'success'
      });

      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);

      window.location.reload(); // Or you can filter out the deleted order from the list.
    } catch (error) {
      console.error('Error deleting order:', error);

      setAlert({
        message: 'Failed to delete order.',
        type: 'error'
      });

      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
    }
  };

  // Helper function to categorize orders
  const categorizeOrders = () => {
    const todayOrders = [];
    const yesterdayOrders = [];
    const thisWeekOrders = [];
    const thisMonthOrders = [];

    orders?.forEach((order) => {
      const orderDate = new Date(order.createdAt);

      if (isToday(orderDate)) {
        todayOrders.push(order);
      } else if (isYesterday(orderDate)) {
        yesterdayOrders.push(order);
      } else if (isThisWeek(orderDate)) {
        thisWeekOrders.push(order);
      } else if (isThisMonth(orderDate)) {
        thisMonthOrders.push(order);
      }
    });

    return {
      todayOrders,
      yesterdayOrders,
      thisWeekOrders,
      thisMonthOrders,
    };
  };

  const categorizedOrders = categorizeOrders();

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      <h1 className="text-4xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
        All Orders
      </h1>

      {/* Custom Alert Notification */}
      {alert.message && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-semibold transition-all ${
            alert.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Display categorized orders */}
      <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-xl p-6 mx-auto max-w-screen-xl">
        {categorizedOrders.todayOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-300 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-lg">
              Today
            </h2>
            <div className="bg-gray-700 shadow-md rounded-b-lg">
              <OrderTable orders={categorizedOrders.todayOrders} handleDelete={handleDelete} />
            </div>
          </div>
        )}

        {categorizedOrders.yesterdayOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-300 bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-t-lg">
              Yesterday
            </h2>
            <div className="bg-gray-700 shadow-md rounded-b-lg">
              <OrderTable orders={categorizedOrders.yesterdayOrders} handleDelete={handleDelete} />
            </div>
          </div>
        )}

        {categorizedOrders.thisWeekOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-300 bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-t-lg">
              This Week
            </h2>
            <div className="bg-gray-700 shadow-md rounded-b-lg">
              <OrderTable orders={categorizedOrders.thisWeekOrders} handleDelete={handleDelete} />
            </div>
          </div>
        )}

        {categorizedOrders.thisMonthOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-300 bg-gradient-to-r from-yellow-500 to-orange-600 p-4 rounded-t-lg">
              This Month
            </h2>
            <div className="bg-gray-700 shadow-md rounded-b-lg">
              <OrderTable orders={categorizedOrders.thisMonthOrders} handleDelete={handleDelete} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Table for rendering orders
const OrderTable = ({ orders, handleDelete }) => {
  return (
    <table className="w-full bg-gray-800 shadow-md rounded-lg border-collapse text-sm">
      <thead className="bg-gray-700 text-gray-200">
        <tr>
          <th className="py-4 px-6 text-left">Order ID</th>
          <th className="py-4 px-6 text-left">User Email</th>
          <th className="py-4 px-6 text-left">Books</th>
          <th className="py-4 px-6 text-left">Total Price</th>
          <th className="py-4 px-6 text-left">Status</th>
          <th className="py-4 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-200">
        {orders.map((order) => (
          <tr
            key={order._id}
            className="border-b border-gray-600 hover:bg-gray-600 transition-all"
          >
            <td className="py-3 px-6 text-left font-medium">{order._id}</td>
            <td className="py-3 px-6 text-left">{order.email}</td>
            <td className="py-3 px-6 text-left">
              {order.books.map((book, idx) => (
                <span key={idx}>
                  {book.title} ({book.quantity})
                  {idx < order.books.length - 1 && ", "}
                </span>
              ))}
            </td>
            <td className="py-3 px-6 text-left font-semibold text-green-400">${order.totalAmount}</td>
            <td className="py-3 px-6 text-left text-yellow-400">{order.paymentStatus}</td>
            <td className="py-3 px-6 text-left">
              {/* Delete button */}
              <button
  onClick={() => handleDelete(order._id)}
  className="inline-block bg-red-600 text-white px-2 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 hover:scale-105"
  title="Delete this order"
>
  {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4 inline-block mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg> */}
  Delete
</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GetAllOrders;
