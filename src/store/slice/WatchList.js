import { createSlice } from "@reduxjs/toolkit";

const WatchListSlicer = createSlice({
  name: "WatchList",
  initialState: {
    myList: [],
  },
  reducers: {
    toggleWatchList: (state, action) => {
      state.myList.some((m) => m.id === action.payload.id)
        ? (state.myList = state.myList.filter(
            (m) => m.id !== action.payload.id
          ))
        : (state.myList = [...state.myList, action.payload]);
    },
    clearWatchList: (state) => {
      state.myList = [];
    },
  },
});

export const { toggleWatchList, clearWatchList } = WatchListSlicer.actions;
export default WatchListSlicer.reducer;
