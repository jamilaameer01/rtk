// UpdateBlog.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBlogsByIdQuery,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../store/slice/blogApi";

const UpdateBlog = () => {
  const { id } = useParams(); // Get the blog id from URL parameters
    const navigate = useNavigate();
     const { refetch } = useGetBlogsQuery(); 

  // Fetch the blog details
  const { data: blog, isLoading, isError } = useGetBlogsByIdQuery(id);
  const [updateBlog] = useUpdateBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });

  useEffect(() => {
    if (blog) {
      // Pre-fill the form with the existing blog data
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        image: blog.image,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await updateBlog({ ...formData, id }).unwrap();
        await refetch();
      console.log("Update successful:", response); // Log the response
      navigate("/"); // Redirect to the blogs list after update
    } catch (error) {
      console.error("Failed to update blog: ", error); // Log the error
      alert("Failed to update blog. Please try again."); // Optionally alert the user
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching blog details.</p>; // Handle errors

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            rows="5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
