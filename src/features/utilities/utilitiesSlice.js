import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isButtonClicked: false,
  localStorageData: {
    ironManStreak: 0,
    ironManAttempts: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    option5050: 0,
    gamesFinished: 0,
  },
  statistics: false,
  showFade: true,
};

const utilitiesSlice = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    setIsButtonClicked: (state, action) => {
      state.isButtonClicked = action.payload;
    },
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
    setLocalStorageData: (state) => {
      state.localStorageData = {
        ironManStreak: localStorage.getItem("ironManStreak"),
        ironManAttempts: localStorage.getItem("ironManAttempts"),
        rightAnswers: localStorage.getItem("rightAnswers"),
        wrongAnswers: localStorage.getItem("wrongAnswers"),
        option5050: localStorage.getItem("option5050"),
        gamesFinished: localStorage.getItem("gamesFinished"),
      };
    },
    resetLocalStorageData: (state) => {
      state.localStorageData = initialState.localStorageData;
    },
    setShowFade: (state, action) => {
      state.showFade = action.payload;
    },
  },
});

export const {
  setIsButtonClicked,
  setStatistics,
  setLocalStorageData,
  resetLocalStorageData,
  setShowFade
} = utilitiesSlice.actions;

export default utilitiesSlice.reducer;
