import * as AuthApi from "../../api/GetUserPost.BasUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let UserPostTimeLine = createAsyncThunk(
  "get timeline user",
  async (formData, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.GetUserPosts(formData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetTimeLineUserSlice = createSlice({
  name: "get timeline user",
  initialState: {
    timeLineUsers: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(UserPostTimeLine.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UserPostTimeLine.fulfilled, (state, action) => {
      state.loading = true;
      state.timeLineUsers = action.payload;
      state.loading = false;
    });
    builder.addCase(UserPostTimeLine.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetTimeLineUserSlice.reducer;
