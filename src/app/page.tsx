"use client";
import MainSection from "@/components/MainSection/MainSection";
import Navbar from "../components/Navbar/Navbar";
import DeviceContainer from "@/components/DeviceContainer/DeviceContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginInfo } from "@/features/auth/authSlice";

export default function Home() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getLoginInfo());
  }, []);
  return (
    <>
      <Navbar />
      <MainSection />
      <DeviceContainer />
    </>
  );
}
