import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart } from "../store/slice/cartSlice";
import { useGetBlogsQuery } from "../store/slice/blogApi";
import Blogs from "./Blogs";

const CartList = ({ blogs }) => {
  console.log("blogs>>>>>>>>>", blogs);
  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {/* cart */}
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">Your Cart</h1>
        {carts.length > 0 ? (
          carts.map((val, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <div className="text-lg font-bold text-gray-800">
                  {val.name}
                </div>
                <div className="text-sm text-gray-600">{val.category}</div>
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Qty:</span> {val.qty}
              </div>
              <button
                onClick={() => dispatch(deleteCart(val.name))}
                className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-purple-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            Your cart is currently empty.
          </div>
        )}
      </div>

      <h1 className="text-center text-4xl font-bold pb-4 text-purple-700">Blogs</h1>
      {/* BLOGS */}
      <Blogs blogs={blogs} />
    </div>
  );
};

export default CartList;
