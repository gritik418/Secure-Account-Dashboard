"use client";
import MainSection from "@/components/MainSection/MainSection";
import Navbar from "../components/Navbar/Navbar";
import DeviceContainer from "@/components/DeviceContainer/DeviceContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getLoginInfo,
  getUserAsync,
  selectAuthentication,
} from "@/features/auth/authSlice";
import { redirect } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch<any>();
  const authentication = useSelector(selectAuthentication);

  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getLoginInfo());
  }, [dispatch]);

  useEffect(() => {
    if (authentication === "failed") {
      return redirect("/login");
    }
  }, [authentication]);

  return (
    <>
      <Navbar />
      <MainSection />
      <DeviceContainer />
    </>
  );
}
