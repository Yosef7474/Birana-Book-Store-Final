import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`, // Replace with your backend URL
    prepareHeaders: (headers) => {
      const token =  localStorage.getItem('token');
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
      invalidatesTags: ["Orders"],
    }),

    // Fetch orders for a user
    getUserOrders: builder.query({
      query: (userId) => `/orders/user/${userId}`,
      providesTags: ["Orders"],
    }),

    // Fetch all orders (for admin)
    getAllOrders: builder.query({
      query: () => "/orders/admin",
      providesTags: ["Orders"],
    }),

    // Update order status (for admin)
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
