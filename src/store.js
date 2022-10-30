import { configureStore } from "@reduxjs/toolkit";
import structureReducer from "./features/structure/structureSlice";
import engineReducer from "./features/engine/engineSlice";

export const store = configureStore({
  reducer: {
    structure: structureReducer,
    engine: engineReducer,
  },
});
