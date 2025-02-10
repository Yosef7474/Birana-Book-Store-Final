import React, { useState, useEffect } from "react";
import BookCard from "../books/BookCard";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const Recommended = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  const [userPreference, setUserPreference] = useState([]);
  const [randomizedBooks, setRandomizedBooks] = useState([]);

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  useEffect(() => {
    const token = getCookie("token");
  
    if (!token) {
      console.warn("Token not found in cookies.");
      return;
    }
  
    const decodedToken = decodeJWT(token);
  
    if (decodedToken && Array.isArray(decodedToken.preferences)) {
      setUserPreference(decodedToken.preferences);
    } else {
      console.error("User preferences not found or invalid in token");
    }
  }, []);
  

  useEffect(() => {
    if (userPreference.length > 0) {
      const filteredBooks = books.filter((book) =>
        userPreference.some(
          (preference) =>
            String(book.category).toLowerCase() ===
            String(preference).toLowerCase()
        )
      );
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
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1180: { slidesPerView: 3, spaceBetween: 50 },
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
        <p className="text-center text-gray-500">Login for better Experience</p>
      )}
    </div>
  );
};

export default Recommended;
