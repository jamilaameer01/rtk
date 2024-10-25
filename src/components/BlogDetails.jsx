import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlogsByIdQuery } from "../store/slice/blogApi";

const BlogDetails = () => {
  const { id } = useParams();
   const { data: blog, isLoading, refetch } = useGetBlogsByIdQuery(id);

   // Use useEffect to refetch data when the blog changes
   React.useEffect(() => {
     if (blog) {
       // Add logic to check if the blog data should be refetched
       refetch();
     }
   }, [blog, refetch]);
  

 
 return blog ? (
   <div className="max-w-2xl mx-auto rounded overflow-hidden shadow-lg bg-white p-6">
     <img
       className="w-full h-80 object-cover mb-6"
       src={blog.image}
       alt={blog.title}
     />
     <h1 className="font-bold text-3xl mb-4">{blog.title}</h1>
     <p className="text-gray-700 text-lg mb-4">{blog.content}</p>
     <p className="text-sm text-gray-500">
       By {blog.author} on {blog.date}
     </p>
     <p className="text-sm text-gray-500 mt-4">
       {blog.likes} Likes • {blog.comments} Comments
     </p>
     <div className="flex flex-wrap gap-2 mt-4">
       {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
         blog.tags.map((tag, index) => (
           <span
             key={index}
             className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
           >
             #{tag}
           </span>
         ))
       ) : (
         <span className="text-gray-500 text-sm">No tags available</span>
       )}
     </div>
   </div>
 ) : (
   <p>No blog found</p>
 );

};

export default BlogDetails;
