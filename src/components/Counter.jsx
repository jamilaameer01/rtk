import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../store/slice/counterSlice"

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  return (
    <div className="w-72 mx-auto">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>

      <div className="mt-5">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>

      <div className="mt-5">
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded mt-5"
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}
        >
          Increment by {incrementAmount}
        </button>
      </div>
    </div>
  );
};

export default Counter;
