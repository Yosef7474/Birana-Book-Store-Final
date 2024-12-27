import React from "react";
import { useFetchAllOrdersQuery } from "../../redux/features/orders/orderApi";

const GetAllOrders = () => {
  const { data: orders, isLoading, isError } = useFetchAllOrdersQuery();

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error fetching orders.</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">User Email</th>
              <th className="py-3 px-6 text-left">Books</th>
              <th className="py-3 px-6 text-left">Total Price</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders?.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{order.id}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">
                  {order.books.map((book, idx) => (
                    <span key={idx}>
                      {book.title} ({book.quantity})
                      {idx < order.books.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td className="py-3 px-6 text-left">${order.totalPrice}</td>
                <td className="py-3 px-6 text-left">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllOrders;
