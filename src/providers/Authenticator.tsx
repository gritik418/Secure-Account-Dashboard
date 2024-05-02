"use client";
import { getUserAsync } from "@/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Authenticator = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);
  return <div>{children}</div>;
};

export default Authenticator;
