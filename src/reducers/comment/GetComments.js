import * as AuthApi from "../../api/Comment.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let GetCommentApi = createAsyncThunk(
  "get comments",
  async (formData, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.GetComment(formData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetCommentSlice = createSlice({
  name: "get comments",
  initialState: {
    GetcomPost: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(GetCommentApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetCommentApi.fulfilled, (state, action) => {
      state.loading = true;
      state.GetcomPost = action.payload;
      state.loading = false;
    });
    builder.addCase(GetCommentApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetCommentSlice.reducer;
