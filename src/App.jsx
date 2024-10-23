import { useGetBlogsQuery, useNewBlogsMutation } from "./redux/api";
import Blogs from "./components/Blogs";
import { useState } from "react";

function App() {
  const { isLoading, isError, data } = useGetBlogsQuery("");
  const [newBlogs] = useNewBlogsMutation()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const submitHandler = () => {
    e.preventDafult();

    
  }


  return (
    <div className="p-4">
      <form className="flex gap-6 " onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-red-600"
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-red-600"
        />
        <button type="submit" className="border border-purple-600">
          Add
        </button>
      </form>

      {/* <Blogs blogs={data} /> */}
    </div>
  );
}

export default App;
