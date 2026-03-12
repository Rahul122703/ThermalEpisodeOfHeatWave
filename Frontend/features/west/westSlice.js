import { createSlice } from "@reduxjs/toolkit";

import {
  fetchWestWinterPredict,
  fetchWestPremonsoonPredict,
  fetchWestMonsoonPredict,
  fetchWestPostmonsoonPredict,
} from "../../thunks/westThunks";

const initialState = {
  winter: null,  //data here is stored inthis format 
  /*{
  "forecast_next_7_days": [
    35.98850631713867,
    35.61729431152344,
    35.301597595214844,
    35.02092361450195,
    34.76461410522461,
    34.51368713378906,
    34.2889404296875
  ],
  "model": "west-monsoon"
}

  */
  premonsoon: null,
  monsoon: null,
  postmonsoon: null,

  loading: false,
  error: null,
};

const westSlice = createSlice({
  name: "west",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // WEST WINTER
      .addCase(fetchWestWinterPredict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWestWinterPredict.fulfilled, (state, action) => {
        state.loading = false;
        state.winter = action.payload;
      })
      .addCase(fetchWestWinterPredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // WEST PREMONSOON
      .addCase(fetchWestPremonsoonPredict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWestPremonsoonPredict.fulfilled, (state, action) => {
        state.loading = false;
        state.premonsoon = action.payload;
      })
      .addCase(fetchWestPremonsoonPredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // WEST MONSOON
      .addCase(fetchWestMonsoonPredict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWestMonsoonPredict.fulfilled, (state, action) => {
        state.loading = false;
        state.monsoon = action.payload;
      })
      .addCase(fetchWestMonsoonPredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // WEST POST MONSOON
      .addCase(fetchWestPostmonsoonPredict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWestPostmonsoonPredict.fulfilled, (state, action) => {
        state.loading = false;
        state.postmonsoon = action.payload;
      })
      .addCase(fetchWestPostmonsoonPredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default westSlice.reducer;