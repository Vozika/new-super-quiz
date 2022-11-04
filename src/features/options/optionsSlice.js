import { createSlice } from "@reduxjs/toolkit";
import { interfaceEN } from "../../interface";
import data from "../../data";

const initialState = {
  show5050: false,
  flip: false,
  lessAnswers: false,
  numberOfQuestions: {
    current: 10,
    options: [5, 10, 15, data.length],
  },
  numberOfAnswers: 4,
  ironMan: false,
  ironManModal: false,
  hideLetters: false,
  interfaceText: { ...interfaceEN },
  RU: false,
  EN: true,
  statistics: false,
  options: false,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    switchShow5050: (state) => {
      state.show5050 = !state.show5050;
    },
    setShow5050: (state, action) => {
      state.show5050 = action.payload;
    },
    switchLessAnswers: (state) => {
      state.lessAnswers = !state.lessAnswers;
    },
    setLessAnswers: (state, action) => {
      state.lessAnswers = action.payload;
    },
    switchFlip: (state) => {
      state.flip = !state.flip;
    },
    setFlip: (state, action) => {
      state.flip = action.payload;
    },
    setNumberOfQuestions: (state, action) => {
      state.numberOfQuestions.current = action.payload;
    },
    setIronMan: (state, action) => {
      state.ironMan = action.payload;
    },
    setIronManModal: (state, action) => {
      state.ironManModal = action.payload;
    },
    switchHideLetters: (state) => {
      state.hideLetters = !state.hideLetters;
    },
    setHideLetters: (state, action) => {
      state.hideLetters = action.payload;
    },
    setInterfaceText: (state, action) => {
      state.interfaceText = action.payload;
    },
    setRU: (state, action) => {
      state.RU = action.payload;
    },
    switchRU: (state) => {
      state.RU = !state.RU;
    },
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
  },
});

export const {
  switchShow5050,
  setShow5050,
  switchLessAnswers,
  setLessAnswers,
  switchFlip,
  setFlip,
  setNumberOfQuestions,
  setIronMan,
  setIronManModal,
  switchHideLetters,
  setHideLetters,
  setInterfaceText,
  setRU,
  switchRU,
  setStatistics,
  setOptions,
} = optionsSlice.actions;

export default optionsSlice.reducer;
