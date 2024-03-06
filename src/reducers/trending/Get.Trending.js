import * as AuthApi from "../../api/GetTrending.BasUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let trendApi = createAsyncThunk(
  "get trend",
  async (formatdata, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.TagTrend();

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetTrendingSlice = createSlice({
  name: "get trend",
  initialState: {
    tagTrend: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(trendApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(trendApi.fulfilled, (state, action) => {
      state.loading = true;
      state.tagTrend = action.payload;
      state.loading = false;
    });
    builder.addCase(trendApi.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetTrendingSlice.reducer;
