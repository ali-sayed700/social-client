import * as AuthApi from "../../api/User.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let UpdateUser = createAsyncThunk(
  "update user",
  // async ({ id, data }, { rejectWithValue }) => {
  async ( {id, formatDat} , { rejectWithValue }) => {
console.log(id);
console.log(formatDat);
    const res = await AuthApi.UpdateUserApi({ id, formatDat });

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let UpdateUsersSlice = createSlice({
  name: "update user",
  initialState: {
    newIfU: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(UpdateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      state.loading = true;
      state.newIfU = action.payload;

      state.loading = false;
    });
    builder.addCase(UpdateUser.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default UpdateUsersSlice.reducer;
