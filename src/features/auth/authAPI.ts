import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type UserLoginDataType = {
  email: string;
  password: string;
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
