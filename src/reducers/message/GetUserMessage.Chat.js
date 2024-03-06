import * as AuthApi from "../../api/GetUserMessage.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let UserMessageApi = createAsyncThunk(
  "get user chat",
  async (formData, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };
    const res = await AuthApi.userMessage(formData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let UserMessageSlice = createSlice({
  name: "get user chat",
  initialState: {
    userMsg: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(UserMessageApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UserMessageApi.fulfilled, (state, action) => {
      state.loading = true;
      state.userMsg = action.payload;
      state.loading = false;
    });
    builder.addCase(UserMessageApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default UserMessageSlice.reducer;
