import * as AuthApi from "../../api/CreatePost.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let CreatePostApi = createAsyncThunk(
  "UploadPost",
  async ({ id, data }, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.CreatePost({ id, data });

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let UploadPostSlice = createSlice({
  name: "UploadPost",
  initialState: {
    createPost: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(CreatePostApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreatePostApi.fulfilled, (state, action) => {
      state.loading = true;
      state.createPost = action.payload;
      state.loading = false;
    });
    builder.addCase(CreatePostApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default UploadPostSlice.reducer;
