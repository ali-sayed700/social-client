import * as AuthApi from "../../api/User.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let GetOneUser = createAsyncThunk(
  "get one user",
  // async ({ id, data }, { rejectWithValue }) => {
  async (id, { rejectWithValue }) => {
    const res = await AuthApi.GetSpecificUser(id);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetOneUsersSlice = createSlice({
  name: "get one user",
  initialState: {
    GetSpUser: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(GetOneUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetOneUser.fulfilled, (state, action) => {
      state.loading = true;
      state.GetSpUser = action.payload;

      state.loading = false;
    });
    builder.addCase(GetOneUser.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetOneUsersSlice.reducer;
