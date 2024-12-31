import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`, // Backend base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
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

    // Fetch user-specific orders by email
    // fetchUserOrders: builder.query({
    //   query: (email) => `/user-orders?email=${email}`, // Adjust endpoint if needed
    //   providesTags: (result, error, email) => [{ type: "Orders", id: email }], // Scoped tags for user-specific cache
    // }),

    // Verify a payment (e.g., for an order)
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/callback",
        method: "POST",
        body: paymentData,
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
  useVerifyPaymentMutation,
} = orderApi;
