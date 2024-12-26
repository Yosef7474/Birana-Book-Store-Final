import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAddCommentMutation, useFetchBooksByIdQuery } from '../../redux/features/books/booksApi';
import { getImgUrl } from '../../utils/getImgUrl';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { AuthContext } from '../../context/AuthContext';

// Function to render stars based on rating (half stars supported)
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
// cover
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < fullStars
              ? 'text-yellow-500'
              : index === fullStars && hasHalfStar
              ? 'text-yellow-300'
              : 'text-gray-300'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5 3 1-6-4-4 6-1L10 0l2 6 6 1-4 4 1 6z" />
        </svg>
      ))}
    </div>
  );
};

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBooksByIdQuery(id);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState('');
  const [addComment, { isLoading: isCommentLoading }] = useAddCommentMutation();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleCommentSubmit = async () => {
    if (!user?.email || !comment.trim()) {
      alert('Please provide a valid email and comment.');
      return;
    }

    try {
      const response = await addComment({ id: book._id, email: user.email, comment }).unwrap();
      console.log('Comment response:', response);
      alert('Thank you for your comment!');
      setComment(''); // Clear the comment input
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert(`Failed to submit comment: ${err.data?.message || err.message || 'Unknown error'}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading book</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Book Cover */}
        <div className="sm:w-1/2 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book?.title || 'Book Cover'}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Book Details & Actions */}
        <div className="flex flex-col sm:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{book?.title}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{book?.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold text-green-600">Br {book?.newPrice}</div>
            <div className="text-gray-500 line-through ml-2">Br {book?.oldPrice}</div>
          </div>

          <div>
            <span className="text-sm text-gray-500">Available Quantity: {book?.quantity}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(book)}
            className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center gap-2 font-medium transition duration-300 hover:bg-blue-700"
          >
            <HiOutlineShoppingBag />
            <span>Add to Cart</span>
          </button>

          {/* Rating Section */}
          <div className="mt-4">
            <span className="text-lg font-semibold">Average Rating: </span>
            <StarRating rating={book?.averageRating || 0} />
            <span className="ml-2 text-sm text-gray-500">
              {book.averageRating ? book.averageRating.toFixed(1) : 'No ratings yet'}
            </span>
          </div>
        </div>
      </div>

      {/* Book Details Section */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Book Details</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Author:</strong> {book.author || 'Unknown'}
          </li>
          <li>
            <strong>Genre:</strong> {book?.category || 'Unknown'}
          </li>
          <li>
            <strong>Published Date:</strong> {new Date(book?.createdAt).toLocaleDateString()}
          </li>
        </ul>
      </div>

      {/* Comment Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Leave a Comment</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded-md mb-4"
          placeholder="Write your comment here..."
          rows="4"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={isCommentLoading}
        >
          {isCommentLoading ? 'Submitting...' : 'Submit Comment'}
        </button>

        {/* Display Comments */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Comments</h3>
          {book?.comments?.length > 0 ? (
            <ul className="space-y-4">
              {book.comments.map((comment, index) => (
                <li key={index} className="border p-3 rounded-md">
                  <p className="font-bold">{comment.email}</p>
                  <p>{comment.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
      {/* average */}

      {/* Back to All Books */}
      <div className="mt-6">
        <Link to="/books" className="text-blue-600 font-medium hover:underline">
          &larr; Back to all books
        </Link>
      </div>
    </div>
  );
};

export default SingleBook;
