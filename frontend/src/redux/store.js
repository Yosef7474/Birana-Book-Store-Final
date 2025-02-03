import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/cart/userSlice";

import booksApi from "./features/books/booksApi";
import userApi from "./features/users/userApi";
import { orderApi } from "./features/orders/orderApi";
import adminStatsApi from "./features/adminStats/statsApi.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    User: userReducer,

    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminStatsApi.reducerPath]: adminStatsApi.reducer, // Add the admin stats reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      adminStatsApi.middleware // Add the admin stats middleware
    ),
});

export default store;
