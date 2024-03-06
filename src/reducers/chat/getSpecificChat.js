import * as AuthApi from "../../api/GetUserChat.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let getSpecificChatApi = createAsyncThunk(
  "get specific chat",
  async ({senderId,receiverId}, { rejectWithValue }) => {
    const res = await AuthApi.getSpecificChat(senderId,receiverId);

    
    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetSpecificChatApiSlice = createSlice({
  name: "get specific chat",
  initialState: {
    GetOneChat: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(getSpecificChatApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificChatApi.fulfilled, (state, action) => {
      state.loading = true;
      state.GetOneChat = action.payload;
      state.loading = false;
    });
    builder.addCase(getSpecificChatApi.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default GetSpecificChatApiSlice.reducer;
