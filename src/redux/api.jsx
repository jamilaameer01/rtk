import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogs = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
    endpoints: (builder) => ({
        getBlogs: builder.query({ query: () => "blogs" }),
        newBlogs: builder.mutation({
            query: (blogs) => ({
                url: "blogs",
                method: "POST",
                body: blogs,
            })
        })
  })
});

export const { useGetBlogsQuery, useNewBlogsMutation } = blogs;
 