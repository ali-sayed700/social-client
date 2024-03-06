import * as AuthApi from "../../api/GetUserChat.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let UserChatsApi = createAsyncThunk(
  "get user chat",
  async (formData, { rejectWithValue }) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    const res = await AuthApi.userChats(formData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let UserChatsSlice = createSlice({
  name: "get user chat",
  initialState: {
    userChat: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(UserChatsApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UserChatsApi.fulfilled, (state, action) => {
      state.loading = true;
      state.userChat = action.payload;
      state.loading = false;
    });
    builder.addCase(UserChatsApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default UserChatsSlice.reducer;
