import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
const {currentUser} = true;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [isChecked, setIsChecked] = useState(false)
  const onSubmit = (data) => {
    console.log(data)
  const newOrder = {
    name: data.name,
    email: currentUser?.email,
    address: {
      city: data.city,
      country: data.country,
      state: data.state,
      zipcode: data.zipcode
    },

    phone: data.phone,
    productId: cartItems.map(item => item?.id),
    totalPrice: totalPrice,
  }
  console.log(newOrder)
}
  return (
    <section>
  <div className="min-h-screen flex items-center justify-center ">
    <div className="w-full max-w-3xl px-6 py-10  shadow-xl rounded-3xl overflow-hidden">
      
      <div className="flex flex-col mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-purple-700 mb-2">Cash On Delivery</h2>
        <p className="text-gray-500">Review your order and fill in your details to proceed.</p>
        <p className="text-gray-700 mt-4 font-medium">Total Price: <span className="text-purple-700 font-bold">${totalPrice}</span></p>
        <p className="text-gray-500">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition duration-150 ease-in-out"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email Address</label>
            <input
              type="text"
              id="email"
              defaultValue={currentUser?.email}
              disabled
              className="w-full mt-1 p-3 bg-gray-100 text-gray-500 border-2 border-purple-200 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-600">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="w-full mt-1 p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition duration-150 ease-in-out"
              placeholder="+123 456 7890"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-600">Address / Street</label>
            <input
              type="text"
              id="address"
              className="w-full mt-1 p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition duration-150 ease-in-out"
              placeholder="1234 Main St"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-600">City</label>
            <input
              type="text"
              id="city"
              className="w-full mt-1 p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition duration-150 ease-in-out"
              placeholder="City"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-semibold text-gray-600">Country / Region</label>
            <input
              type="text"
              id="country"
              className="w-full mt-1 p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition duration-150 ease-in-out"
              placeholder="Country"
            />
          </div>

         

          
        </div>

        <div className="flex items-center mt-6 space-x-3">
          <input type="checkbox" id="terms" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
          <label htmlFor="terms" className="text-sm text-gray-500">
            I agree to the <Link to="#" className="underline text-purple-600">Terms & Conditions</Link> and <Link to="#" className="underline text-purple-600">Shopping Policy</Link>.
          </label>
        </div>

        <button
          type="submit"
          disabled={!isChecked}
          className="w-full mt-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out"
        >
          Place Order
        </button>
      </form>
    </div>
  </div>
</section>


  )
}

export default CheckoutPage