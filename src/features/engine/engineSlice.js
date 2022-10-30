import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";

const initialState = {
  data: data.slice(0, 14),
  usedData: [],
  question: { text: "", question: "", answers: [] },
};

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {
    clearUsedData: (state) => {
      state.usedData.length = 0;
    },
    firstUsedData: (state, action) => {
      state.usedData = [action.payload];
    },
    spreadToUsedData: (state, action) => {
      state.usedData = [...state.usedData, action.payload];
    },
    spreadToAnswers: (state, action) => {
      state.question.answers = [...action.payload];
    },
    pushToAnswers: (state, action) => {
      state.question.answers.push(action.payload);
    },
    randomizeAnswers: (state) => {
      state.question.answers.sort(() => {
        return 0.5 - Math.random();
      });
    },
  },
});

export const {
  clearUsedData,
  firstUsedData,
  spreadToUsedData,
  spreadToAnswers,
  pushToAnswers,
  randomizeAnswers,
} = engineSlice.actions;

export default engineSlice.reducer;
