import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({ query: () => `blogs` }),
    getBlogsById: builder.query({ query: (id) => `blogs/${id}` }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blogs",
        method: ("POST"),
        body:data
      })
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `blogs/${data.id}`,
        method: ("PUT"),
        body:data
      })
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: ("DELETE"),
        body:data
      })
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogsByIdQuery,useCreateBlogMutation,useUpdateBlogMutation,useDeleteBlogMutation } = blogApi;
