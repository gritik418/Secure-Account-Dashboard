import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserLoginDataType, userLogin } from "./authAPI";

const initialState = {
  isLoggedIn: false,
  loginLoading: false,
};

export const userLoginAsync = createAsyncThunk(
  "auth/userLogin",
  async (userData: UserLoginDataType) => {
    const response = await userLogin(userData);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state, action) => {
        state.loginLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        if (action.payload.success) {
          const token = action.payload.token;
          if (token && token !== "") {
            localStorage.setItem("at", token);
            state.isLoggedIn = true;
          } else {
            state.isLoggedIn = false;
          }
        }
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLoginLoading = (state: any) => state.auth.loginLoading;

export default authSlice.reducer;
