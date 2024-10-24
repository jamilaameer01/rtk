import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({ query: () => `blogs` }),
  }),
});

export const { useGetBlogsQuery } = blogApi;
