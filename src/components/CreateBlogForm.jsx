import React, { useState } from "react";
import { useCreateBlogMutation } from "../store/slice/blogApi";
import { useGetBlogsQuery } from "../store/slice/blogApi";

const CreateBlogForm = ({ onBlogCreated }) => {
  const { refetch } = useGetBlogsQuery();
  const [createBlog, { isLoading, isSuccess, isError }] =
    useCreateBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
    image: "",
    likes: 0,
    comments: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch(); 
    const newBlog = await createBlog(formData).unwrap();
    setFormData({
      title: "",
      content: "",
      author: "",
      date: "",
      image: "",
      likes: 0,
      comments: 0,
    });
    onBlogCreated(newBlog);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Create New Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition duration-200"
          >
            {isLoading ? "Adding Blog..." : "Add Blog"}
          </button>
        </form>
        {isSuccess && (
          <p className="text-green-500 mt-4 text-center">
            Blog added successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-500 mt-4 text-center">Failed to add blog.</p>
        )}
      </div>
    </div>
  );
};

export default CreateBlogForm;
