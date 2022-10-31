import { createSlice } from "@reduxjs/toolkit";
import { interfaceEN } from "../../interface";

const initialState = {
  show5050: false,
  flip: false,
  lessAnswers: false,
  numberOfQuestions: 10,
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
    setShow5050: (state) => {
      state.show5050 = !state.show5050;
    },
    setShow5050False: (state) => {
      state.show5050 = false;
    },
    setLessAnswers: (state) => {
      state.lessAnswers = !state.lessAnswers;
    },
    setLessAnswersFalse: (state) => {
      state.lessAnswers = false;
    },
    setFlip: (state) => {
      state.flip = !state.flip;
    },
    setFlipFalse: (state) => {
      state.flip = false;
    },
    setNumberOfQuestions: (state, number) => {
      state.numberOfQuestions = number.payload;
    },
    setIronManTrue: (state) => {
      state.ironMan = true;
    },
    setIronManFalse: (state) => {
      state.ironMan = false;
    },
    setIronManModalTrue: (state) => {
      state.ironManModal = true;
    },
    setIronManModalFalse: (state) => {
      state.ironManModal = false;
    },
    setHideLetters: (state) => {
      state.hideLetters = !state.hideLetters;
    },
    setHideLettersFalse: (state) => {
      state.hideLetters = false;
    },
    setInterfaceText: (state, lang) => {
      state.interfaceText = lang.payload;
    },
    setRUTrue: (state) => {
      state.RU = true;
    },
    setRUFalse: (state) => {
      state.RU = false;
    },
    setRU: (state) => {
      state.RU = !state.RU;
    },
    setStatisticsTrue: (state) => {
      state.statistics = true;
    },
    setStatisticsFalse: (state) => {
      state.statistics = false;
    },
    setOptionsTrue: (state) => {
      state.options = true;
    },
    setOptionsFalse: (state) => {
      state.options = false;
    }
  },
});

export const {
  setShow5050,
  setShow5050False,
  setLessAnswers,
  setLessAnswersFalse,
  setFlip,
  setFlipFalse,
  setNumberOfQuestions,
  setIronManTrue,
  setIronManFalse,
  setIronManModalTrue,
  setIronManModalFalse,
  setHideLetters,
  setHideLettersFalse,
  setRUTrue,
  setRUFalse,
  setRU,
  setInterfaceText,
  setStatisticsTrue,
  setStatisticsFalse,
  setOptionsTrue,
  setOptionsFalse
} = optionsSlice.actions;

export default optionsSlice.reducer;
