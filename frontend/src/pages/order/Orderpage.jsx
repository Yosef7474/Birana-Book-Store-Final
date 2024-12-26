import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../redux/features/orders/orderApi";
import { AuthContext } from "../../context/AuthContext";

const Orderpage = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation();

  // State for tracking user-specified quantities
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item._id]: item.quantity || 1 }), {})
  );

  // Update quantity for a specific book
  const handleQuantityChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, Number(value)), // Ensure quantity is at least 1
    }));
  };

  // Calculate total price based on user-specified quantities
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.newPrice * quantities[item._id],
    0
  );

  const handlePlaceOrder = async () => {
    const orderData = {
      name: user.name,
      email: user.email,
      books: cartItems.map((item) => ({
        _id: item._id,
        title: item.title,
        price: item.newPrice,
        quantity: quantities[item._id],
        paymentStatus: 'Pending'
      })),
      totalAmount: totalPrice,
    };

    try {
      console.log("Order Data:", orderData);
      await createOrder(orderData).unwrap();
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  const EmptyCartPlaceholder = (
    <div className="text-center py-10">
      <p className="text-gray-600 text-lg">Your cart is empty. Please add some items before placing an order.</p>
    </div>
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h3>
      {cartItems.length === 0 ? (
        EmptyCartPlaceholder
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">${item.newPrice.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor={`quantity-${item._id}`} className="text-sm text-gray-600">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item._id}`}
                    min="1"
                    value={quantities[item._id]}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    className="w-16 border border-gray-300 rounded-md text-center py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold text-gray-800">
              Total: <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
            </p>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="bg-purple-600 text-white font-medium py-2 px-6 rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>

          {isSuccess && <p className="mt-4 text-green-600">Order placed successfully!</p>}
          {error && <p className="mt-4 text-red-600">{error.data?.message || "An error occurred."}</p>}
        </div>
      )}
    </div>
  );
};

export default Orderpage;
