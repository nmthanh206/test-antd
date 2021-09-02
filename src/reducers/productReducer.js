import { createSlice } from "@reduxjs/toolkit";

const productReducer = createSlice({
  name: "productReducer",
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productReducer.actions;

export default productReducer.reducer;
