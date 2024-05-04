import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type UserLoginDataType = {
  email: string;
  password: string;
};

export type UserSignupDataType = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password_confirmation: string;
};

export type EmailVerificationDataType = {
  email: string;
  otp: string;
};

export type ChangePasswordDataType = {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export const userLogin = async (userData: UserLoginDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const userSignup = async (userData: UserSignupDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const verifyEmail = async (userData: EmailVerificationDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/verify`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getUser = async (token: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/user/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const signOutFromOtherDevice = async (
  uniqueId: string,
  token: string
) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/signout/${uniqueId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const logoutUser = async (token: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/logout/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const changePassword = async (token: string, userData: any) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/changepassword/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
