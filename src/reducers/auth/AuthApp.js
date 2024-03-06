import * as AuthApi from "../../api/Auth.BaseUrl";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let AuthApp = createAsyncThunk(
  "Login",
  async (formData, { rejectWithValue }) => {
    let res;

    if (formData.type === "login") {
      res = await AuthApi.logIn(formData.dataApi);
    } else {
      res = await AuthApi.signUp(formData.dataApi);
    }

    try {
      return res.data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export let PostLoginSlice = createSlice({
  name: "Login",
  initialState: {
    login: [],
    loading: false,
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(AuthApp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AuthApp.fulfilled, (state, action) => {
      state.loading = true;
      state.login = action.payload;

      // localStorage.setItem("user", JSON.stringify(state.login));
      state.loading = false;
    });
    builder.addCase(AuthApp.rejected, (state, action) => {
      // console.log(action.payload.response.data.errors);

      state.loading = false;

      state.error = action.payload;
    });
  },
});

export default PostLoginSlice.reducer;
