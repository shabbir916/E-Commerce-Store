import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProduct: (state, action) => {
      state.products = action.payload;
    },
    loadlazyProduct: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
  },
});

export default productSlice.reducer;
export const { loadProduct, loadlazyProduct } = productSlice.actions;
