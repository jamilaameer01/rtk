import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
} from "../store/slice/blogApi";
import CreateBlogForm from "./CreateBlogForm";

const Blogs = () => {
  const { data: blogs = [], isLoading, refetch } = useGetBlogsQuery();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id).unwrap();
      refetch(); // Refresh blogs after deletion
    }
  };

  const handleAddBlog = () => {
    setShowCreateForm(true);
  };

  const handleBlogCreated = () => {
    setShowCreateForm(false);
    refetch(); // Refetch to ensure the new blog appears at the top
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {!showCreateForm && (
        <button
          onClick={handleAddBlog}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Blog
        </button>
      )}
      {showCreateForm ? (
        <CreateBlogForm onBlogCreated={handleBlogCreated} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
              >
                {blog.image && (
                  <img
                    className="w-full h-60 object-cover"
                    src={blog.image}
                    alt={blog.title}
                  />
                )}
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{blog.title}</div>
                  <p className="text-gray-700 text-base">
                    {blog.content
                      ? blog.content.substring(0, 100) + "..."
                      : "No content available."}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-500">By {blog.author}</p>
                  <p className="text-sm text-gray-500">
                    {blog.likes} Likes • {blog.comments} Comments
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/blog/update/${blog.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-500 hover:underline"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
