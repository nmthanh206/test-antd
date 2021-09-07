import { createSlice } from "@reduxjs/toolkit";

let listSearch;
if (typeof window !== "undefined") {
   listSearch = localStorage.getItem("search-keyword")
      ? JSON.parse(localStorage.getItem("search-keyword"))
      : [];
}

const productReducer = createSlice({
   name: "productReducer",
   initialState: { listProduct: [], listNameProduct: [], listSearch },
   reducers: {
      setProducts: (state, action) => {
         state.listProduct = action.payload;
      },
      setListNameProducts: (state, action) => {
         state.listNameProduct = action.payload;
      },
      setListSearch: (state, action) => {
         state.listSearch = action.payload;
         localStorage.setItem(
            "search-keyword",
            JSON.stringify(state.listSearch)
         );
      },
      deleteSearch: (state, action) => {
         state.listSearch = action.payload;
         localStorage.setItem(
            "search-keyword",
            JSON.stringify(state.listSearch)
         );
      },
   },
});

// Action creators are generated for each case reducer function
export const { setProducts, setListNameProducts, setListSearch, deleteSearch } =
   productReducer.actions;

export default productReducer.reducer;
