import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: true,
  main: false,
  finish: false,
};

const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {
    setStart: (state, action) => {
      state.start = action.payload;
    },

    setMain: (state, action) => {
      state.main = action.payload;
    },

    setFinish: (state, action) => {
      state.finish = action.payload;
    },
  },
});

export const { setStart, setMain, setFinish } = structureSlice.actions;

export default structureSlice.reducer;
