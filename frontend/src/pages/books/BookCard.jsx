import React, { useContext, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Icons for stars
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAddRatingMutation } from "../../redux/features/books/booksApi";
import { AuthContext } from "../../context/AuthContext";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0); // Store the user's rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect on stars
  const [addRating, { isLoading, isSuccess, error }] = useAddRatingMutation();
  const { user } = useContext(AuthContext);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRatingSubmit = async (selectedRating) => {
    const bookid = book._id;
    const email = user?.email;

    if (!email) {
      alert("User email is not available.");
      return;
    }

    try {
      const response = await addRating({ id: bookid, email, rating: selectedRating }).unwrap();
      console.log("Rating response:", response);
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert(`Failed to submit rating: ${err.data?.message || err.message || "Unknown error"}`);
    }
  };

  // Render stars for user rating
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => {
          setRating(star);
          handleRatingSubmit(star); // Submit the rating
        }}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        style={{ cursor: "pointer", fontSize: "1.5rem" }}
      >
        {hoverRating >= star || rating >= star ? (
          <AiFillStar color="#FFD700" /> // Filled star
        ) : (
          <AiOutlineStar color="#FFD700" /> // Empty star
        )}
      </span>
    ));
  };

  // Render average rating as stars
  const renderAverageRating = () => {
    const avgRating = book.averageRating || 0;
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating - fullStars >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <AiFillStar key={index} color="#FFD700" />;
          } else if (index === fullStars && hasHalfStar) {
            return <AiFillStar key={index} color="#FFD700" />;
          } else {
            return <AiOutlineStar key={index} color="#FFD700" />;
          }
        })}
        <span className="ml-2 text-gray-700">({avgRating.toFixed(1) || "0.0"})</span>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-md bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 flex flex-col sm:flex-row">
      <Link to={`/books/${book._id}`} className="block overflow-hidden rounded-lg sm:w-1/2">
        <img
          src={`${getImgUrl(book?.coverImage)}`}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </Link>

      <div className="p-4 sm:w-1/2">
        <Link to={`/books/${book._id}`} className="block hover:text-blue-600">
          <h3 className="text-xl font-bold mb-2">{book?.title}</h3>
        </Link>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {book.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-green-600">Br {book?.newPrice}</span>
          <span className="text-gray-500 line-through ml-2">Br {book?.oldPrice}</span>
        </div>

        <div>
          <div className="flex">{renderStars()}</div>
          {isLoading && <p>Submitting...</p>}
          {isSuccess && <p className="text-green-500">Book Rated</p>}
          {error && <p style={{ color: "red" }}>Error: {error?.data?.message}</p>}
        </div>

        <div className="mt-4">
          
          {renderAverageRating()}
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="w-full bg-primary text-white py-2 rounded-md flex justify-center items-center gap-2 font-medium transition duration-300 hover:bg-blue-700 mt-4"
        >
          <HiOutlineShoppingBag />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
