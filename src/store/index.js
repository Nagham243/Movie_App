import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counter";
import WatchListReducer from "./slice/WatchList";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    WatchList: WatchListReducer,
  } /* waiting for reducer from slice */,
});
