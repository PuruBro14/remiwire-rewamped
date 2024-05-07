import { createAsyncThunk } from "@reduxjs/toolkit";

//add to Cart
export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      //   const response = await axiosInstance.post("/api/v1/addToCart", data);
      return true;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
