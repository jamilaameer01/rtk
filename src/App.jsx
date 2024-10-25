import Counter from "./components/Counter";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";

import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCreateBlogMutation } from "./store/slice/blogApi";
import CreateBlogForm from "./components/CreateBlogForm";

function App() {
 
  const [updateBlog, result] = useCreateBlogMutation();
  console.log("result>>>>>>",result)

  return (
    <div className="p-4">
      <Router>
        <div className="p-4">
          {/* <Counter /> */}
          {/* <ProductList /> */}
          {/* <CartList /> */}
         <CreateBlogForm/>
          <Routes>
           
            <Route path="/" element={<Blogs />} />
           
            <Route path="/blog/:id" element={<BlogDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
