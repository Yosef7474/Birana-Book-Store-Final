import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import Cookies from "js-cookie"; 

const Login = () => {
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/users/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );


       // Store token in cookies
    Cookies.set("token", response.data.token, {
      expires: 7, 
    
    });

      alert("Login successful!");
      navigate("/"); 
      window.location.reload();
    } catch (error) {
      setServerError(error.response?.data?.message || "Login failed. Try again.");
    }finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-8 py-10">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:shadow`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:shadow`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {serverError && (
            <p className="text-red-500 text-sm text-center mt-4">
              {serverError}
            </p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/api/users/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Register
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-500 text-sm">
          Birana Book Store
        </p>
      </div>
    </div>
  );
};

export default Login;
