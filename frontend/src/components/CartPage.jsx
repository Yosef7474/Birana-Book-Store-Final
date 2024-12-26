import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../utils/getImgUrl';
import { clearCart, removeFromCart } from '../redux/features/cart/cartSlice';


const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch()

  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const handleRemoveFromCart = (product) =>{
    dispatch(removeFromCart(product)) 
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }


  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl rounded-lg">
  <div className="flex-1 overflow-y-auto p-8">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h2>
      <button
        type="button"
        onClick={handleClearCart}
        className="py-2 px-4 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-all duration-200"
      >
        Clear Cart
      </button>
    </div>

    <div>
      {cartItems.length > 0 ? (
        <ul role="list" className="space-y-6">
          {cartItems.map((product) => (
            <li key={product._id} className="flex items-center p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <img
                  alt={product?.title}
                  src={`${getImgUrl(product?.coverImage)}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    <Link to="/" className="hover:underline">{product?.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    <strong>{product?.category}</strong> Fiction
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-medium text-gray-700">{product?.newPrice}</p>
                  <p className="text-gray-600 text-sm">
                    <strong>Qty:</strong> 1
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    type="button"
                    className="text-indigo-500 hover:text-indigo-600 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center py-12 text-lg">Your cart is currently empty</p>
      )}
    </div>
  </div>

  <div className="border-t border-gray-200 p-8 bg-white rounded-b-lg">
    <div className="flex justify-between text-xl font-semibold text-gray-800">
      <p>Subtotal</p>
      <p>${totalPrice ? totalPrice : 0}</p>
    </div>
    <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

    {cartItems.length > 0 ? (
        <div className="mt-8">
      <Link
        to="/api/orders/orderPage"
        className="flex items-center justify-center w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-lg font-medium text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
      >
        Proceed to Checkout
      </Link>
    </div>
    )
    : (
      <div className="mt-8 flex items-center justify-center">
        <p className="flex items-center justify-center max-w-sm rounded-full bg-red-600 px-6 py-3 text-lg font-medium text-white shadow-lg">
          Nothing to Checkout
        </p>
      </div>
      
    )

      
    }
    
    <div className="mt-6 text-center text-sm">
      <Link to="/" className="text-indigo-500 hover:text-indigo-600 transition duration-200">
        Continue Shopping &rarr;
      </Link>
    </div>
  </div>
</div>


  )
}

export default CartPage