import React, { useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useRegisterUserMutation } from "../redux/features/users/userApi";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";

const genres = [
  "Fiction",
  "Horror",
  "Business",
  "Technology",
  "Science Fiction",
  "Non-Fiction",
  "Adventure",
];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailError, setEmailError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleCheckboxChange = (genre) => {
    setPreferences((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const onSubmit = async (data) => {
    try {
      // Register the user by passing the registration data (name, email, password, preferences)
      // const response = await axios.post(data.name, data.email, data.password, data.preferences);
      
      const response = await axios.post(
        `${getBaseUrl()}/api/users/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      console.log(response);
      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/"); // Redirect to home page after successful registration
      } else if (response.status === 400) {
        setEmailError(true);
      } else {
        console.log("something went wrong...");
        
      }
    } catch (error) {
      // setMessage("An error occurred during registration. Please try again.");
      console.error(error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-8 py-10">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow"
              required
            />
            {emailError && (
              <p className="text-red-500 font-bold">The email aready exist</p>
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
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow"
              required
            />
          </div>

          {/* Preferences (Genres) */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Your Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={genre}
                    {...register("preferences", {
                      required: "Please select at least one genre", // Optional validation
                      validate: {
                        unique: (value) => {
                          // Custom validation to ensure unique genres
                          return (
                            !preferences.includes(value) ||
                            "Genre already selected"
                          );
                        },
                      },
                    })}
                    checked={preferences.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)} // Handle preference state change
                    className="form-checkbox"
                  />
                  <span className="text-sm text-gray-600">{genre}</span>
                </label>
              ))}
            </div>
            {errors.preferences && (
              <p className="text-red-500 text-xs">
                {errors.preferences.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-1">{errorMessage}</p>
          )}

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded-lg focus:outline-none transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/api/users/login"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Login
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

export default Register;
