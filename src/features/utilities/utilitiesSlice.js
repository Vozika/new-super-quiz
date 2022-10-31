import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isButtonClicked: false,
};

const utilitiesSlice = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    setIsButtonClicked: (state, action) => {
      state.isButtonClicked = action.payload;
    },
  },
});

export const { setIsButtonClicked } = utilitiesSlice.actions;

export default utilitiesSlice.reducer;
