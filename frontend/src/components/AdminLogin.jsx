import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'

import axios from "axios"
import getBaseUrl from '../utils/baseURL'

const AdminLogin = () => {

    const [message, setMessage] = useState("")

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const navigate = useNavigate()

      const onSubmit = async (data) => {
        
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const auth = response.data;
        

            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Session Expired, Please Login again')
                    navigate("/")
                }, 3600 * 1000)
            }

            alert("Login Succesful")
            navigate("/dashboard")


        } catch (error) {
            setMessage("please Enter a Valid Username or Password")
        }
      }
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-8 py-10">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="email">Username</label>
                <input
                    {...register("username", { required: true })}
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow"
                />
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="password">Password</label>
                <input
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow"
                />
            </div>

            {/* Error Message */}
            {message && <p className="text-red-500 text-xs italic mt-1">{message}</p>}

            {/* Login Button */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow"
                >
                    Login
                </button>
            </div>
        </form>

        


    </div>
</div>
  )
}

export default AdminLogin