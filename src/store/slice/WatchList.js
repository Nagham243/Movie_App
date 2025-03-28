import { createSlice } from "@reduxjs/toolkit";

const WatchListSlicer = createSlice({
  name: "WatchList",
  initialState: {
    myList: [],
    counter: 0
  },
  reducers: {
    toggleWatchList: (state, action) => {
      const isItemInList = state.myList.some((m) => m.id === action.payload.id);
      
      if (isItemInList) {
        state.myList = state.myList.filter((m) => m.id !== action.payload.id);
        state.counter -= 1; 
      } else {
        state.myList = [...state.myList, action.payload];
        state.counter += 1;  
      }
    },
    clearWatchList: (state) => {
      state.myList = [];
      state.counter = 0;  
    },
    setWatchListCounter: (state, action) => {
      state.counter = action.payload;  
    }
  },
});

export const { 
  toggleWatchList, 
  clearWatchList, 
  setWatchListCounter 
} = WatchListSlicer.actions;
export default WatchListSlicer.reducer;
