import React, { useState } from "react";
import { useCreateBlogMutation } from "../store/slice/blogApi";
import { useGetBlogsQuery } from "../store/slice/blogApi";

const CreateBlogForm = () => {
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
    await createBlog(formData);
    refetch(); // Refetch the blogs after creating a new one
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Adding Blog..." : "Add Blog"}
        </button>
      </form>
      {isSuccess && (
        <p className="text-green-500 mt-4">Blog added successfully!</p>
      )}
      {isError && <p className="text-red-500 mt-4">Failed to add blog.</p>}
    </div>
  );
};

export default CreateBlogForm;
