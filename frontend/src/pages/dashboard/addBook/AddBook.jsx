import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState("");

  const onSubmit = async (data) => {
    const newBookData = { ...data, coverImage: imageFileName };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Book added successfully.",
        icon: "success",
        confirmButtonColor: "#4ADE80",
      });
      reset();
      setImageFileName("");
      setImageFile(null);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add book. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-white mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Book Title</label>
          <input
            type="text"
            placeholder="Enter book title"
            {...register("title")}
            className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            placeholder="Enter book description"
            rows="4"
            {...register("description")}
            className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Category</label>
          <select
            {...register("category")}
            className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Choose a Category</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="fiction">Fiction</option>
            <option value="horror">Horror</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>

        {/* Trending Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("trending")}
            className="w-5 h-5 bg-gray-800 border-gray-700 rounded focus:ring-green-500"
          />
          <label className="text-sm font-medium text-gray-300">Mark as Trending</label>
        </div>

        {/* Price Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Old Price</label>
            <input
              type="number"
              placeholder="Old Price"
              {...register("oldPrice")}
              className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">New Price</label>
            <input
              type="number"
              placeholder="New Price"
              {...register("newPrice")}
              className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-lg cursor-pointer"
          />
          {imageFileName && <p className="text-sm text-gray-400 mt-1">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
