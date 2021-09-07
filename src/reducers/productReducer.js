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
         localStorage.setItem("search-keyword", JSON.stringify(action.payload));
      },
      addListSearch: (state, action) => {
         const search = state.listSearch.map((keyword) => keyword.title);
         if (!search.includes(action.payload.title))
            state.listSearch = [...state.listSearch, action.payload];
         else {
            state.listSearch = state.listSearch.filter(
               (keyword) => keyword.title !== action.payload.title
            );
            state.listSearch.unshift(action.payload);
         }
         localStorage.setItem(
            "search-keyword",
            JSON.stringify(state.listSearch)
         );
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   setProducts,
   setListNameProducts,
   setListSearch,
   addListSearch,
} = productReducer.actions;

export default productReducer.reducer;
