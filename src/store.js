import { configureStore } from "@reduxjs/toolkit";
import structureReducer from "./features/structure/structureSlice";
import engineReducer from "./features/engine/engineSlice";
import utilitiesReducer from "./features/utilities/utilitiesSlice";
import scoreReducer from "./features/score/scoreSlice";
import optionsReducer from "./features/options/optionsSlice";

export const store = configureStore({
  reducer: {
    structure: structureReducer,
    engine: engineReducer,
    utilities: utilitiesReducer,
    score: scoreReducer,
    options: optionsReducer,
  },
});
