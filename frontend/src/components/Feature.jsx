import React, { useEffect, useState } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeatureCard from "./FeatureCard";
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";



const Feature = () => {

  const {data: books = []} = useFetchAllBooksQuery();

  const settings = {
    dots: true, // Shows navigation dots
    infinite: true, // Enables infinite scrolling
    speed: 500, // Transition speed (ms)
    slidesToShow: 5, // Number of slides visible at a time
    slidesToScroll: 3, // Number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval (ms)
  };

  

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-semibold text-center text-slate-900 my-8">
        Features Books
      </h2>
      {
      books.length > 0 && (
        <Slider {...settings}>
          {books.slice(8,20).map((book, index) => (
            <div key={index} className="p-4">
              <FeatureCard book={book} />
            </div>
          ))}
        </Slider>
      )
      }
    </div>
  );
};

export default Feature;
