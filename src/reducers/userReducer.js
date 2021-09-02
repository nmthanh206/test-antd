import { createSlice } from "@reduxjs/toolkit";

let userInfoFromStorage = null;
if (typeof window !== "undefined") {
   userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
}
const userLoginReducer = createSlice({
   name: "userLoginReducer",
   initialState: {
      user: userInfoFromStorage,
   },
   reducers: {
      loginUser: (state, action) => {
         state.user = action.payload;
         localStorage.setItem("userInfo", JSON.stringify(action.payload));
      },
      logout: (state, action) => {
         state.user = null;
         localStorage.setItem("userInfo", null);
         localStorage.setItem("cartItems", []);
      },
   },
});

// Action creators are generated for each case reducer function
export const { loginUser, logout } = userLoginReducer.actions;

export default userLoginReducer.reducer;
