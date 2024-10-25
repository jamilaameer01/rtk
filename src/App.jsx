import Counter from "./components/Counter";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";

import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlogForm from "./components/CreateBlogForm";
import UpdateBlog from "./components/UpdateBlog";

function App() {
 
  
  return (
    <div className="p-4">
      <h1 className="text-4xl text-purple-600 text-center font-bold">Blogs</h1>
      <Router>
        <div className="p-4">
          {/* <Counter /> */}
          {/* <ProductList /> */}
          {/* <CartList /> */}
          {/* <CreateBlogForm/> */}
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/blog/update/:id" element={<UpdateBlog />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
