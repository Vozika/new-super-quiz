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
    setStart: (state, bool) => {
      state.start = bool.payload;
    },

    setMain: (state, bool) => {
      state.main = bool.payload;
    },

    setFinish: (state, bool) => {
      state.finish = bool.payload;
    },
  },
});

export const { setStart, setMain, setFinish } = structureSlice.actions;

export default structureSlice.reducer;
