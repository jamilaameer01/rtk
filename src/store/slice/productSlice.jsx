import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "Running Shoes", category: "Puma", qty: 8 },


];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
      addProduct(state, action) {
          state.push(action.payload)
          
       },
      

    deleteProduct(state, action) {},
  },
});

console.log(productSlice);

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
