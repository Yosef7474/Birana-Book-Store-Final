import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import userReducer from './features/cart/userSlice';
import orderReducer from './features/orders/orderSlice'
// import recommendedBooksReducer from './features/cart/recommendedBooksSlice';
import booksApi from './features/books/booksApi'
import userApi from './features/users/userApi'
import { orderApi } from './features/orders/orderApi';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    User: userReducer,
    orders: orderReducer,
    // recommendedBooks: recommendedBooksReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,userApi.middleware,orderApi.middleware)
})
  
export default store;

// import { configureStore } from '@reduxjs/toolkit'
// import cartReducer from './features/cart/cartSlice'
// import booksApi from './features/books/booksApi'
// import usersApi from './features/books/usersApi'

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     [booksApi.reducerPath]: booksApi.reducer,
// [usersApi.reducerPath]: userssApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(booksApi.middleware,usersApi.middleware)
// })






