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

     // Order-related endpoints
     fetchAllOrders: builder.query({
      query: () => '/orders/all-orders',
      providesTags: ['Orders'],
    }),
    fetchUserOrders: builder.query({
      query: (email) => `/orders/user-orders?email=${email}`,
      providesTags: (results, error, email) => [{ type: 'Orders', id: email }],
    }),


    // Payment Callback Endpoint - to update payment status after callback
    paymentCallback: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/callback",  // The endpoint where Chapa sends the payment status
        method: "POST",
        body: paymentData,  // This should include payment details like tx_ref, status, etc.
      }),
      // You might want to invalidate the Orders cache or update them accordingly
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useFetchAllOrdersQuery,
  useFetchUserOrdersQuery,
  usePaymentCallbackMutation
} = orderApi;
