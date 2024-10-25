import React from "react";
import { Link } from "react-router-dom";
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
} from "../store/slice/blogApi";

const Blogs = () => {
  const { data: blogs = [], isLoading } = useGetBlogsQuery();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation(); // Use delete mutation

  if (isLoading) return <p>Loading...</p>;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id).unwrap();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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
              <p className="text-sm text-gray-500">
                By {blog.author} on {blog.date}
              </p>
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
                  onClick={() => handleDelete(blog.id)} // Add click handler for delete
                  className="text-red-500 hover:underline"
                  disabled={isDeleting} // Disable button while deleting
                >
                  {isDeleting ? "Deleting..." : "Delete"}{" "}
                  {/* Show loading state */}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Blogs;
