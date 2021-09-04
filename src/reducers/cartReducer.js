import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
let cartItemsFromStorage = [];
cartItemsFromStorage = Cookie.get("cartItems")
   ? JSON.parse(Cookie.get("cartItems"))
   : [];
// if (typeof window !== "undefined") {
//    cartItemsFromStorage = localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [];
// }
const cartReducer = createSlice({
   name: "cartReducer",
   initialState: {
      cartItems: cartItemsFromStorage,
      shippingAddress: {},
      paymentMethod: "",
   },
   reducers: {
      addToCart: (state, { payload: newItem }) => {
         //  const existItem= state.cartItems.find((item) => item.id === payload.id)
         let existItem = false;
         state.cartItems = state.cartItems.map((item) => {
            if (item.id === newItem.id) {
               existItem = true;
               return newItem;
            }
            return item;
         });
         if (!existItem) {
            state.cartItems.push(newItem);
         }
         Cookie.set("cartItems", JSON.stringify(state.cartItems));
      },
      removeFromCart: (state, { payload: id }) => {
         state.cartItems = state.cartItems.filter((item) => {
            return item.id !== id;
         });
      },
      updateQtyItem: (state, { payload: { id, qty } }) => {
         state.cartItems = state.cartItems.map((item) => {
            if (item.id === id) {
               item.qty = qty;
            }
            return item;
         });
      },
      saveShippingAddress: (state, { payload }) => {
         state.shippingAddress = payload;
      },
      savePaymentMethod: (state, { payload }) => {
         state.paymentMethod = payload;
      },
      resetCart: (state, { payload }) => {
         state.cartItems = [];
         Cookie.set("cartItems", []);
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   addToCart,
   removeFromCart,
   updateQtyItem,
   saveShippingAddress,
   savePaymentMethod,
   resetCart,
} = cartReducer.actions;

export default cartReducer.reducer;
