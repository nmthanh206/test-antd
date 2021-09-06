import { createSlice } from "@reduxjs/toolkit";

const productReducer = createSlice({
   name: "productReducer",
   initialState: { listProduct: [], listNameProduct: [] },
   reducers: {
      setProducts: (state, action) => {
         state.listProduct = action.payload;
      },
      setListNameProducts: (state, action) => {
         state.listNameProduct = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setProducts, setListNameProducts } = productReducer.actions;

export default productReducer.reducer;
