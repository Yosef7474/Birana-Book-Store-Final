import React, { useState, useEffect } from "react";
import BookCard from "../books/BookCard";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const Recommended = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  const [userPreference, setUserPreference] = useState([]); // Array of user preferences
  const [randomizedBooks, setRandomizedBooks] = useState([]); // Randomized filtered books

  // Function to manually decode JWT and get payload
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Get payload part of the token
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert Base64Url to Base64
      const decodedData = JSON.parse(atob(base64)); // Decode and parse the JSON payload
      return decodedData;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() })) // Map items to random sort values
      .sort((a, b) => a.sort - b.sort) // Sort by random values
      .map(({ item }) => item); // Extract items back into an array
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken && Array.isArray(decodedToken.preferences)) {
        setUserPreference(decodedToken.preferences); // Set user preferences (array)
      } else {
        console.error("User preferences not found or invalid in token");
      }
    } else {
      console.error("Token not found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (userPreference.length > 0) {
      // Filter books by user preferences
      const filteredBooks = books.filter((book) =>
        userPreference.some(
          (preference) =>
            String(book.category).toLowerCase() ===
            String(preference).toLowerCase()
        )
      );
      // Shuffle filtered books and update state
      setRandomizedBooks(shuffleArray(filteredBooks));
    }
  }, [books, userPreference]);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Recommended Books</h2>

      {randomizedBooks.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {randomizedBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">
          Login for better Experience
        </p>
      )}
    </div>
  );
};

export default Recommended;
