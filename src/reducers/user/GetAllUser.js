import * as AuthApi from "../../api/User.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let GetAllUser = createAsyncThunk(
  "get all users",
  // async ({ id, data }, { rejectWithValue }) => {
  async (fomatData, { rejectWithValue }) => {
    const res = await AuthApi.AllUser(fomatData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetAllUsersSlice = createSlice({
  name: "get all users",
  initialState: {
    AllUsers: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(GetAllUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetAllUser.fulfilled, (state, action) => {
      state.loading = true;
      state.AllUsers = action.payload;

      state.loading = false;
    });
    builder.addCase(GetAllUser.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetAllUsersSlice.reducer;
