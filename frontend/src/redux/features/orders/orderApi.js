import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie"; // Import js-cookie to interact with cookies
import getBaseUrl from "../../../utils/baseURL";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`, // Backend base URL
    prepareHeaders: (headers) => {
      const token = Cookies.get("token"); // Fetch token from cookie storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // Create an order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orderPage",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"], // Invalidate cache for orders on creation
    }),

    // Fetch orders for a specific user
    getUserOrders: builder.query({
      query: (email) => `/user-orders?email=${email}`, // Adjust endpoint if needed
      providesTags: ["Orders"], // Cache tag for efficient updates
    }),

    // Fetch all orders (Admin view)
    getAllOrders: builder.query({
      query: () => "/orders", // Root endpoint for orders
      providesTags: ["Orders"],
    }),

    // Update the status of a specific order (Admin view)
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/${orderId}/status`, // Ensure backend handles this format
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/callback",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Orders"],
    }),
    // Fetch total amount of all orders
    getTotalOrderAmount: builder.query({
      query: () => "/total-amount", // Endpoint for total amount
      providesTags: ["Orders"], // Cache tag
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useVerifyPaymentMutation,
  useDeleteOrderMutation,
  useGetTotalOrderAmountQuery,
} = orderApi;
