import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useFetchBooksByIdQuery } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL";

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBooksByIdQuery(id);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("description", bookData.description);
      setValue("category", bookData.category);
      setValue("trending", bookData.trending);
      setValue("oldPrice", bookData.oldPrice);
      setValue("newPrice", bookData.newPrice);
      setValue("coverImage", bookData.coverImage);
      setValue("quantity", bookData.quantity);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updateBookData = {
      ...data,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
      quantity: Number(data.quantity),
    };

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Book updated successfully.",
        icon: "success",
        confirmButtonColor: "#4ADE80",
      }).then(() => {
        window.location.reload();
      });
      ;
      
      await refetch();
      
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update book. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">Error fetching book data</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-white mb-6">Update Book</h2>
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
              step={0.01}
              placeholder="Old Price"
              {...register("oldPrice")}
              className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">New Price</label>
            <input
              type="number"
              step={0.01}
              placeholder="New Price"
              {...register("newPrice")}
              className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Cover Image URL</label>
          <input
            type="text"
            placeholder="Enter cover image URL"
            {...register("coverImage")}
            className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            {...register("quantity")}
            className="w-full mt-2 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
