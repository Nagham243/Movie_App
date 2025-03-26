import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    /* actions  */
    decreaseCounter: (state, action) => {
      state.value = action.payload;
    },
    increaseCounter: (state, action) => {
      state.value = action.payload;
    },
    resetCounter: (state) => {
      state.value = 0;
    },
  },
});

export const { decreaseCounter, increaseCounter, resetCounter } =
  counterSlice.actions; // actions

export default counterSlice.reducer; // store
