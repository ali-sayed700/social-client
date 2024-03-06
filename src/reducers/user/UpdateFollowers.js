import * as AuthApi from "../../api/FollowPush.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let UpdateFollower = createAsyncThunk(
  "update follow",
  // async ({ id, data }, { rejectWithValue }) => {
  async (fomatData, { rejectWithValue }) => {
    const res = await AuthApi.UpFollowers(fomatData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let UpdateFollowersSlice = createSlice({
  name: "update follow",
  initialState: {
    follow: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(UpdateFollower.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateFollower.fulfilled, (state, action) => {
      state.loading = true;
      state.follow = action.payload;

      state.loading = false;
    });
    builder.addCase(UpdateFollower.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default UpdateFollowersSlice.reducer;
