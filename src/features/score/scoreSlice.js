import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rightAnswer: 0,
  wrongAnswer: 0,
  score: 0,
  currentQuestion: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setRightAnswer: (state) => {
      state.rightAnswer = state.rightAnswer + 1;
    },
    setWrongAnswer: (state) => {
      state.wrongAnswer = state.wrongAnswer + 1;
    },
    clearRightAnswer: (state) => {
      state.rightAnswer = 0;
    },
    clearWrongAnswer: (state) => {
      state.wrongAnswer = 0;
    },
    setCurrentQuestion: (state) => {
      state.currentQuestion = state.currentQuestion + 1;
    },
    clearCurrentQuestion: (state) => {
      state.currentQuestion = 0;
    },
    setScore: (state) => {
      state.score = state.score + 1;
    },
    clearScore: (state) => {
      state.score = 0;
    },
  },
});

export const {
  setRightAnswer,
  setWrongAnswer,
  clearRightAnswer,
  clearWrongAnswer,
  setCurrentQuestion,
  clearCurrentQuestion,
  setScore,
  clearScore
} = scoreSlice.actions;

export default scoreSlice.reducer;
