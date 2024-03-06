import * as AuthApi from "../../api/User.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let GetAllFollwoing = createAsyncThunk(
  "get all follwoings",
  // async ({ id, data }, { rejectWithValue }) => {
  async (id, { rejectWithValue }) => {
    const res = await AuthApi.UserFollowing();

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetFollowingsUsersSlice = createSlice({
  name: "get all follwoings",
  initialState: {
    GetFollowing: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(GetAllFollwoing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetAllFollwoing.fulfilled, (state, action) => {
      state.loading = true;
      state.GetFollowing = action.payload;

      state.loading = false;
    });
    builder.addCase(GetAllFollwoing.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetFollowingsUsersSlice.reducer;
