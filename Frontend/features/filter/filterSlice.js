import { createSlice } from "@reduxjs/toolkit";

// helper function
function formatDate(date) {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

// generate dynamic dates
const today = new Date();
const todayLabel = formatDate(today);

const dateOptions = Array.from({ length: 8 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return i === 0 ? todayLabel : formatDate(d);
});

const initialState = {
  regions: [
    "North",
    "West",
    "Central",
    "South",
    "Northeast",
    "Southwest",
  ],

  seasons: [
    "Premonsoon",
    "Monsoon",
    "Postmonsoon",
    "Winter",
  ],

  dates: dateOptions,

  selectedRegion: "North",
  selectedSeason: "Premonsoon",
  selectedDate: todayLabel,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },

    setSeason: (state, action) => {
      state.selectedSeason = action.payload;
    },

    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setRegion, setSeason, setDate } = filterSlice.actions;

export default filterSlice.reducer;