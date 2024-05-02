import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UserLoginDataType,
  getUser,
  signOutFromOtherDevice,
  userLogin,
} from "./authAPI";
import jwt, { JwtPayload } from "jsonwebtoken";

const initialState = {
  isLoggedIn: false,
  loginLoading: false,
  loginHistory: [],
  userLoading: false,
  user: {},
  tokenInfo: {},
  authentication: "",
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

export const signOutFromOtherDeviceAsync = createAsyncThunk(
  "auth/signoutOtherDevice",
  async (uniqueId: string) => {
    const token = localStorage.getItem("at")!;
    const response = await signOutFromOtherDevice(uniqueId, token);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getLoginInfo: (state) => {
      const token = localStorage.getItem("at") || "";
      if (!token || token === "") {
        state.isLoggedIn = false;
        state.authentication = "failed";
        return;
      }
      const user = jwt.decode(token) as JwtPayload;
      if (user.id) {
        state.isLoggedIn = true;
        state.tokenInfo = user;
        state.authentication = "";
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
            state.authentication = "";
          } else {
            state.isLoggedIn = false;
          }
        }
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
        state.authentication = "failed";
        localStorage.clear();
      })
      .addCase(getUserAsync.pending, (state, action) => {
        state.userLoading = true;
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.userLoading = false;
        if (action.payload.success) {
          state.isLoggedIn = true;
          state.authentication = "";
          state.user = action.payload.user;
          state.loginHistory = action.payload.user.login_history;
        } else {
          state.loginLoading = false;
          state.isLoggedIn = false;
          state.authentication = "failed";
          localStorage.clear();
        }
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
        state.authentication = "failed";
        localStorage.clear();
      })
      .addCase(signOutFromOtherDeviceAsync.pending, (state, action) => {})
      .addCase(signOutFromOtherDeviceAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (action.payload.deletedHistory) {
            state.loginHistory = state.loginHistory.filter((history: any) => {
              return history._id !== action.payload.deletedHistory._id;
            });
          }
        }
      })
      .addCase(signOutFromOtherDeviceAsync.rejected, (state, action) => {});
  },
});

export const { getLoginInfo } = authSlice.actions;

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLoginLoading = (state: any) => state.auth.loginLoading;
export const selectUserLoading = (state: any) => state.auth.userLoading;
export const selectUser = (state: any) => state.auth.user;
export const selectLoginHistory = (state: any) => state.auth.loginHistory;
export const selectTokenInfo = (state: any) => state.auth.tokenInfo;
export const selectAuthentication = (state: any) => state.auth.authentication;

export default authSlice.reducer;
