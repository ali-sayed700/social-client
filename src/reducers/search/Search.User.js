import * as AuthApi from "../../api/Search.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let SearchUserApi = createAsyncThunk(
  "search user",
  // async ({ id, data }, { rejectWithValue }) => {
  async (fomatData, { rejectWithValue }) => {
    const res = await AuthApi.SearchWordUser(fomatData);

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let GetUserSearchSlice = createSlice({
  name: "search user",
  initialState: {
    searchUser: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(SearchUserApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SearchUserApi.fulfilled, (state, action) => {
      state.loading = true;
      state.searchUser = action.payload;

      state.loading = false;
    });
    builder.addCase(SearchUserApi.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default GetUserSearchSlice.reducer;
