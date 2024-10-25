import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../store/slice/blogApi";

const UpdateBlogForm = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetBlogsQuery(); // Fetch the blog data
  const [updateBlog] = useUpdateBlogMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
    image: "",
    likes: 0,
    comments: 0,
  });

  useEffect(() => {
    if (blog) {
      const selectedBlog = blog.find((b) => b.id === parseInt(id)); // Get the blog by ID
      if (selectedBlog) {
        setFormData(selectedBlog); // Set the form data with the selected blog
      }
    }
  }, [blog, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog({ id: parseInt(id), ...formData });
    navigate("/"); // Navigate back to the blogs list after updating
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields similar to CreateBlogForm */}
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Likes</label>
          <input
            type="number"
            name="likes"
            value={formData.likes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Comments</label>
          <input
            type="number"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogForm;
