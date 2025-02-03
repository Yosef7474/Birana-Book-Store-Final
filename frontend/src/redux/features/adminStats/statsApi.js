// services/adminStatsApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/admin`, // Adjust the base URL
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    },
});

const adminStatsApi = createApi({
    reducerPath: 'adminStatsApi',
    baseQuery,
    tagTypes: ['AdminStats'],
    endpoints: (builder) => ({
        // Fetch admin stats
        fetchAdminStats: builder.query({
            query: () => '/stats', // Endpoint for fetching admin statistics
            providesTags: ['AdminStats'],
        }),

        // Update admin stats manually (e.g., after new orders or books)
        updateAdminStats: builder.mutation({
            query: (updatedStats) => ({
                url: '/update-stats',
                method: 'PUT',
                body: updatedStats, // The updated statistics to be sent
            }),
            invalidatesTags: ['AdminStats'], // Invalidate the cache to re-fetch stats after update
        }),

        // Optionally, you can add other endpoints for more fine-grained control
        fetchBooksStats: builder.query({
            query: () => '/books-stats', // Endpoint for fetching specific book stats like total quantity, etc.
            providesTags: ['AdminStats'],
        }),

        fetchOrdersStats: builder.query({
            query: () => '/orders-stats', // Endpoint for fetching order stats like total revenue, order count, etc.
            providesTags: ['AdminStats'],
        }),
    }),
});

export const {
    useFetchAdminStatsQuery,
    useUpdateAdminStatsMutation,
    useFetchBooksStatsQuery,
    useFetchOrdersStatsQuery,
} = adminStatsApi;

export default adminStatsApi;
