import * as AuthApi from "../../api/FollowPush.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let UpdateUnFollower = createAsyncThunk(
  "update unfollow",
  // async ({ id, data }, { rejectWithValue }) => {
  async (fomatData, { rejectWithValue }) => {
    const res = await AuthApi.RemFollowers(fomatData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let UpdateUnFollowersSlice = createSlice({
  name: "update unfollow",
  initialState: {
    unFollow: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(UpdateUnFollower.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateUnFollower.fulfilled, (state, action) => {
      state.loading = true;
      state.unFollow = action.payload;

      state.loading = false;
    });
    builder.addCase(UpdateUnFollower.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default UpdateUnFollowersSlice.reducer;
