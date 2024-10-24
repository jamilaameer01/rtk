import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, { payload }) {
      const obj = state.find((val) => val.name === payload.name);
      if (obj) {
        ++obj.qty;
        const newState = state.filter((val) => val.name !== obj.name);
        state = [...newState, obj];
        return;
      }

      state.push(payload);
    },
    deleteCart(state, action) {
      return state.filter((val) => val.name !== action.payload);
      
    },
  },
});

console.log(cartSlice);

export const { addCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
