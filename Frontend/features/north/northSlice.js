import { createSlice } from "@reduxjs/toolkit";

import {
  fetchNorthPremonsoonPredict,
  fetchNorthMonsoonPredict,
  fetchNorthPostmonsoonPredict,
} from "../../thunks/northThunks";

const initialState = {
  premonsoon: null,
  monsoon: null,
  postmonsoon: null,

  loading: false,
  error: null,
};

const northSlice = createSlice({
  name: "north",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // NORTH PRE MONSOON
      .addCase(fetchNorthPremonsoonPredict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNorthPremonsoonPredict.fulfilled, (state, action) => {
        state.loading = false;
        state.premonsoon = action.payload;
      })
      .addCase(fetchNorthPremonsoonPredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // NORTH MONSOON
      .addCase(fetchNorthMonsoonPredict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNorthMonsoonPredict.fulfilled, (state, action) => {
        state.loading = false;
        state.monsoon = action.payload;
      })
      .addCase(fetchNorthMonsoonPredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // NORTH POST MONSOON
      .addCase(fetchNorthPostmonsoonPredict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNorthPostmonsoonPredict.fulfilled, (state, action) => {
        state.loading = false;
        state.postmonsoon = action.payload;
      })
      .addCase(fetchNorthPostmonsoonPredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default northSlice.reducer;
