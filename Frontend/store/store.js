import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import westReducer from "../features/west/westSlice";
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    west: westReducer,
  },
});
