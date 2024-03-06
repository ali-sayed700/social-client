import * as AuthApi from "../../api/GetUserMessage.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let CreateMessageApi = createAsyncThunk(
  "get user chat",
  async (formData, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };
  console.log(formData);
    const res = await AuthApi.CreateMessage(formData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let CreateMessageMessageSlice = createSlice({
  name: "get user chat",
  initialState: {
    createMsg: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(CreateMessageApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateMessageApi.fulfilled, (state, action) => {
      state.loading = true;
      state.createMsg = action.payload;
      state.loading = false;
    });
    builder.addCase(CreateMessageApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default CreateMessageMessageSlice.reducer;
