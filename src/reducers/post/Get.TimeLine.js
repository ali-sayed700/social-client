
import * as AuthApi from "../../api/Get.BasUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let TimeLine = createAsyncThunk(
  "get TimeLines posts",
  async (formatdata, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.getTimelinePosts();

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);


export let GetTimeLineSlice = createSlice({
  name: "get timeLine posts",
  initialState: {
    getTimeLine: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(TimeLine.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(TimeLine.fulfilled, (state, action) => {
      state.loading = true;
      state.getTimeLine = action.payload;
      state.loading = false;
    });
    builder.addCase(TimeLine.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetTimeLineSlice.reducer;
