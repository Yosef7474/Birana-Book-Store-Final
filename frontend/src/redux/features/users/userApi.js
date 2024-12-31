import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`, // Base path for your API
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register', // This resolves to: http://localhost:5000/api/users/register
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/login', // This resolves to: http://localhost:5000/api/users/login
        method: 'POST',
        body: userData,
      }),
    }),
    getUsersByEmail: builder.query({
      query: (email) => ({
        url: `/users/email/${email}`, // This resolves to: http://localhost:5000/api/users/email/:email
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/update', // This resolves to: http://localhost:5000/api/users/update
        method: 'PUT',
        body: userData,
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
