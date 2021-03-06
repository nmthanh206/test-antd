import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
let userInfoFromStorage = null;
userInfoFromStorage = Cookie.get("userInfo")
   ? JSON.parse(Cookie.get("userInfo"))
   : null;
// if (typeof window !== "undefined") {
//    userInfoFromStorage = localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo"))
//       : null;
// }
const userLoginReducer = createSlice({
   name: "userLoginReducer",
   initialState: {
      user: userInfoFromStorage,
   },
   reducers: {
      loginUser: (state, action) => {
         state.user = action.payload;
         Cookie.set("userInfo", JSON.stringify(action.payload), { expires: 2 });
      },
      logout: (state) => {
         state.user = null;
         // Cookie.set("userInfo", null);
         // Cookie.set("cartItems", []);
         Cookie.remove("userInfo");
         Cookie.remove("cartItems");
         localStorage.removeItem("search-keyword");
      },
   },
});

// Action creators are generated for each case reducer function
export const { loginUser, logout } = userLoginReducer.actions;

export default userLoginReducer.reducer;
