import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserLoginDataType, getUser, userLogin } from "./authAPI";
import jwt, { JwtPayload } from "jsonwebtoken";

const initialState = {
  isLoggedIn: false,
  loginLoading: false,
  userLoading: false,
  user: {},
  tokenInfo: {},
};

export const userLoginAsync = createAsyncThunk(
  "auth/userLogin",
  async (userData: UserLoginDataType) => {
    const response = await userLogin(userData);
    return response;
  }
);

export const getUserAsync = createAsyncThunk("auth/getUser", async () => {
  const token = localStorage.getItem("at")!;
  const response = await getUser(token);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getLoginInfo: (state) => {
      const token = localStorage.getItem("at") || "";
      const user = jwt.decode(token) as JwtPayload;
      if (user.id) {
        state.isLoggedIn = true;
        state.tokenInfo = user;
      }
    },
  },
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
      })
      .addCase(getUserAsync.pending, (state, action) => {
        state.userLoading = true;
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.userLoading = false;
        console.log(action.payload);
        if (action.payload.success) {
          state.isLoggedIn = true;
          state.user = action.payload.user;
        }
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export const { getLoginInfo } = authSlice.actions;

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLoginLoading = (state: any) => state.auth.loginLoading;
export const selectUserLoading = (state: any) => state.auth.userLoading;
export const selectUser = (state: any) => state.auth.user;
export const selectTokenInfo = (state: any) => state.auth.tokenInfo;

export default authSlice.reducer;
