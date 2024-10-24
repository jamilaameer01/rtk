import Counter from "./components/Counter";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";
import { useGetBlogsQuery } from "./store/slice/blogApi";
import Blogs from "./components/Blogs";

// import Blogs from "./components/Blogs";

function App() {
  const { data } = useGetBlogsQuery("");
  console.log("jjd....>>>>>>>" , data)
  
  return (
    <div className="p-4">
      
      <Counter />
      <ProductList />
      <CartList blogs={data} />
      {/* <Blogs blogs={data} /> */}
    </div>
  );
}

export default App;
