import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../store/slice/blogApi";

const Blogs = () => {
  const { data: blogs = [] } = useGetBlogsQuery();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
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
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Blogs;
