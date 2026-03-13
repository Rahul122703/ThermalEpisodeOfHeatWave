import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import westReducer from "../features/west/westSlice";
import northReducer from "../features/north/northSlice";
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    west: westReducer,
    north: northReducer,
  },
});
