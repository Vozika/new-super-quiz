import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";

const initialState = {
  data: data,
  usedData: [],
  question: { text: "", object: "", answers: [] },
  topic: [
    { object: "name", subject: "capital" },
    { object: "name", subject: "region" },
    { object: "capital", subject: "name" },
  ],
};

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {
    clearUsedData: (state) => {
      state.usedData.length = 0;
    },
    oneItemToUsedData: (state, action) => {
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
    setQuestionText: (state, action) => {
      state.question.text = action.payload;
    },
    setQuestionObject: (state, action) => {
      state.question.object = action.payload;
    },
  },
});

export const {
  clearUsedData,
  oneItemToUsedData,
  spreadToUsedData,
  spreadToAnswers,
  pushToAnswers,
  randomizeAnswers,
  setQuestionText,
  setQuestionObject,
} = engineSlice.actions;

export default engineSlice.reducer;
