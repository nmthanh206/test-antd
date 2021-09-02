import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
export const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    productList: productReducer,
    cart: cartReducer,
  },
});
