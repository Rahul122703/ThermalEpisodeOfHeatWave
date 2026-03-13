import { createAsyncThunk } from "@reduxjs/toolkit";
import { NORTH_API_ENDPOINTS } from "../services/north/northServices";

// NORTH PRE MONSOON
export const fetchNorthPremonsoonPredict = createAsyncThunk(
  "north/fetchNorthPremonsoonPredict",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(NORTH_API_ENDPOINTS.premonsoon.predict);

      if (!res.ok) {
        throw new Error("Failed to fetch north premonsoon prediction");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// NORTH MONSOON
export const fetchNorthMonsoonPredict = createAsyncThunk(
  "north/fetchNorthMonsoonPredict",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(NORTH_API_ENDPOINTS.monsoon.predict);

      if (!res.ok) {
        throw new Error("Failed to fetch north monsoon prediction");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// NORTH POST MONSOON
export const fetchNorthPostmonsoonPredict = createAsyncThunk(
  "north/fetchNorthPostmonsoonPredict",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(NORTH_API_ENDPOINTS.postmonsoon.predict);

      if (!res.ok) {
        throw new Error("Failed to fetch north postmonsoon prediction");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
