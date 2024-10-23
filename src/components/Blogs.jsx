import React from "react";

const Blogs = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs?.map((blog) => (
        <div
          key={blog.id}
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
        >
          <img
            className="w-full h-60 object-cover"
            src={blog.image}
            alt={blog.title}
          />
          <div className="px-6 py-4 ">
            <div className="font-bold text-xl mb-2">{blog.title}</div>
            <p className="text-gray-700 text-base">
              {blog.content.substring(0, 100)}...
            </p>
          </div>
          <div className="px-6 py-4 ">
            <p className="text-sm text-gray-500">
              By {blog.author} on {blog.date}
            </p>
            <div className="flex gap-y-3 justify-between mt-4 flex-col items-start">
              <p className="text-sm text-gray-500">
                {blog.likes} Likes • {blog.comments} Comments
              </p>
              <div className="flex flex-wrap gap-y-5 ">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
