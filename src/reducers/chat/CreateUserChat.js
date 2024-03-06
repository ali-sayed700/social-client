import * as AuthApi from "../../api/GetUserChat.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let CreateChatsApi = createAsyncThunk(
  "create user chat",
  async (formData, { rejectWithValue }) => {
    const res = await AuthApi.userCreateChats(formData);


    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let CreateUserChatsSlice = createSlice({
  name: "create user chat",
  initialState: {
    CreateChat: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(CreateChatsApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateChatsApi.fulfilled, (state, action) => {
      state.loading = true;
      state.CreateChat = action.payload;
      state.loading = false;
    });
    builder.addCase(CreateChatsApi.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default CreateUserChatsSlice.reducer;
