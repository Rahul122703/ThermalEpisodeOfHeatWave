import { createAsyncThunk } from "@reduxjs/toolkit";
import { WEST_API_ENDPOINTS } from "../services/west/westServices";


// WEST WINTER
export const fetchWestWinterPredict = createAsyncThunk(
  "west/fetchWestWinterPredict",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(WEST_API_ENDPOINTS.winter.predict);

      if (!res.ok) {
        throw new Error("Failed to fetch west winter prediction");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// WEST PREMONSOON
export const fetchWestPremonsoonPredict = createAsyncThunk(
  "west/fetchWestPremonsoonPredict",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(WEST_API_ENDPOINTS.premonsoon.predict);

      if (!res.ok) {
        throw new Error("Failed to fetch west premonsoon prediction");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// WEST MONSOON
export const fetchWestMonsoonPredict = createAsyncThunk(
  "west/fetchWestMonsoonPredict",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(WEST_API_ENDPOINTS.monsoon.predict);

      if (!res.ok) {
        throw new Error("Failed to fetch west monsoon prediction");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// WEST POST MONSOON
export const fetchWestPostmonsoonPredict = createAsyncThunk(
  "west/fetchWestPostmonsoonPredict",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(WEST_API_ENDPOINTS.postmonsoon.predict);

      if (!res.ok) {
        throw new Error("Failed to fetch west postmonsoon prediction");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);