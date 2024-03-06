import * as AuthApi from "../../api/CreatePost.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let CreatePostsApi = createAsyncThunk(
  "create posts",
  async (data, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };


    const res = await AuthApi.CreateOnePost(data);
    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetPostsShareSlice = createSlice({
  name: "create posts",
  initialState: {
    BuildPost: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(CreatePostsApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreatePostsApi.fulfilled, (state, action) => {
      state.loading = true;
      state.BuildPost = action.payload;
      state.loading = false;
    });
    builder.addCase(CreatePostsApi.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetPostsShareSlice.reducer;
