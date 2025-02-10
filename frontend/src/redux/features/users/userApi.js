import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`, // Base path for your API
    prepareHeaders: (headers) => {
          const token = Cookies.get("token"); // Fetch token from cookie storage
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
    credentials: 'include', // Include cookies in all requests
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register', // This resolves to: http://localhost:5000/api/users/register
        method: 'POST',
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/login', // This resolves to: http://localhost:5000/api/users/login
        method: 'POST',
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getUsersByEmail: builder.query({
      query: (email) => ({
        url: `/users/email/${email}`, // This resolves to: http://localhost:5000/api/users/email/:email
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/update', // This resolves to: http://localhost:5000/api/users/update
        method: 'PUT',
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUsersByEmailQuery,
  useUpdateProfileMutation, // Export the hook for updateProfile
} = userApi;

export default userApi;