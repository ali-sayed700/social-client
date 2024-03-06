import * as AuthApi from "../../api/Comment.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let CreateCommentApi = createAsyncThunk(
  "create comments",
  async ({ id, format }, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };
 

    const res = await AuthApi.CreateComment({ id, format });

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let CreateCommentSlice = createSlice({
  name: "create comments",
  initialState: {
    comPost: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(CreateCommentApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateCommentApi.fulfilled, (state, action) => {
      state.loading = true;
      state.comPost = action.payload;
      state.loading = false;
    });
    builder.addCase(CreateCommentApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default CreateCommentSlice.reducer;
