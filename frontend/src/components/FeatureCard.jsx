import React from 'react'
import { Link } from "react-router-dom";
import { getImgUrl } from "../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

const FeatureCard = ({book}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
  
  return (
    <div>
     <Link to={`/books/${book._id}`}>
                <img
                  src={`${getImgUrl(book.coverImage)}`}
                  alt={book.title}
                />
              </Link>

    </div>
  );
};
export default FeatureCard;
