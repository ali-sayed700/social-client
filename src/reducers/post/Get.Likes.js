import * as AuthApi from "../../api/Get.BasUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let LikesApi = createAsyncThunk(
  "like post",
  async (formData, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.LikePosts(formData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetLikesPostsSlice = createSlice({
  name: "like post",
  initialState: {
    likesList: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(LikesApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LikesApi.fulfilled, (state, action) => {
      state.loading = true;
      state.likesList = action.payload;
      state.loading = false;
    });
    builder.addCase(LikesApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetLikesPostsSlice.reducer;
