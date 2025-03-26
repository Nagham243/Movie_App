import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counter";
import cartReducer from "./slice/Cart";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  } /* waiting for reducer from slice */,
});
