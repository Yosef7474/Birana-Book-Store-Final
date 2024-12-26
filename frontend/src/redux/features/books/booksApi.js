import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'


const  baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBooksById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{type: "Books", id}]
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query: ({id,newBook, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: newBook,
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        deleteABook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Book"]
        }),
         // Rating-related endpoints
         addRating: builder.mutation({
            query: ({ id, email, rating }) => ({
              url: `/rate/${id}`,
              method: "POST",
              body: { email, rating }, // Send email instead of userId
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Books", id: id }],
          }),
          fetchRating: builder.query({
            query: (id) => `/rate/${id}`,
            providesTags: (results, error, id) => [{ type: "Books", id }],
          }),

        //   comment related 
        addComment: builder.mutation({
            query: ({id, email, comment}) => ({
                url: `/comment/${id}`,
                method: 'POST',
                body: {email, comment},
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Books", id: id }],
        })
          
       
    })
})

export const {useFetchAllBooksQuery, useFetchBooksByIdQuery,useAddBookMutation, useUpdateBookMutation,useDeleteABookMutation, useAddRatingMutation, useAddCommentMutation} = booksApi;
export default booksApi;