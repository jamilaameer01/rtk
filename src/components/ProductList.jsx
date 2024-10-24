import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../store/slice/productSlice";
import { addCart } from "../store/slice/cartSlice";

const ProductList = () => {
  const products = useSelector((state) => state.product);
  const carts = useSelector((state) => state.cart);
  console.log("cart:", carts);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState(1); 
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (name && category && qty > 0) {
      dispatch(addProduct({ name, category, qty }));

      setName("");
      setCategory("");
      setQty(1);
    } else {
      alert("Please fill in all fields and ensure quantity is greater than 0");
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addCart(item));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Shoe Cart</h1>

      <div className="mb-4 space-x-7 text-center">
        <input
          type="text"
          placeholder="Shoe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="p-2 mb-4 border border-gray-300 rounded"
          min="1"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={handleAddProduct}
        >
          Add to Cart
        </button>
      </div>

      {products.length > 0 ? (
        <ul className="space-y-4 flex flex-wrap gap-6 items-center justify-center">
          {products.map((item, index) => (
            <li
              key={index}
              className="p-4 border text-center rounded-lg bg-gray-100 hover:bg-gray-200 transition w-[300px] mx-auto"
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-700">
                Category: <span className="font-medium">{item.category}</span>
              </p>
              <p className="text-gray-700">
                Quantity: <span className="font-medium">{item.qty}</span>
              </p>
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No products available. Please add some.
        </div>
      )}
    </div>
  );
};

export default ProductList;
