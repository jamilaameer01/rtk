import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({ query: () => `blogs`, providesTags: ["Blog"] }),
    getBlogsById: builder.query({
      query: (id) => `blogs/${id}`,
      providesTags: (id) => [{ type: "Blog", id }],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blogs",
        method: "POST",
        body: data,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `blogs/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Blog" }], // This will invalidate the Blog tag
    }),  
  }),
});

export const { useGetBlogsQuery, useGetBlogsByIdQuery,useCreateBlogMutation,useUpdateBlogMutation,useDeleteBlogMutation } = blogApi;
