import * as AuthApi from "../../api/GetUserPost.BasUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let GetOnePostsApi = createAsyncThunk(
  "get specific posts",
  async (formatdata, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.GetSpecificPosts(formatdata);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetOnePostsApiSlice = createSlice({
  name: "get specific posts",
  initialState: {
    GetPost: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(GetOnePostsApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetOnePostsApi.fulfilled, (state, action) => {
      state.loading = true;
      state.GetPost = action.payload;
      state.loading = false;
    });
    builder.addCase(GetOnePostsApi.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetOnePostsApiSlice.reducer;
