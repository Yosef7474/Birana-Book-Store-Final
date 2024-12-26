import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL'


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
    getRecommendedBooks: builder.query({
      query:(userData) => (
        {url : "/recommended", // Endpoint for recommendations
        method: 'get',
        body: userData,
      }),
    }),
    updatePreferences: builder.mutation({
      query: (userData) => (
        { url: "/profile",
          method: 'put',
          body: userData,
        }
      )
    })

  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetRecommendedBooksQuery, useUpdatePreferencesMutation } = userApi;
export default userApi;
