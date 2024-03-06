import * as AuthApi from "../../api/GetUserChat.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let DeleteChatsApi = createAsyncThunk(
  "delete chat",
  async (formData, { rejectWithValue }) => {
    const res = await AuthApi.deleteChat(formData);


    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let DeleteChatsSlice = createSlice({
  name: "delete chat",
  initialState: {
    DelChat: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteChatsApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteChatsApi.fulfilled, (state, action) => {
      state.loading = true;
      state.DeleteChat = action.payload;
      state.loading = false;
    });
    builder.addCase(DeleteChatsApi.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default DeleteChatsSlice.reducer;
