"use client";
import MainSection from "@/components/MainSection/MainSection";
import Navbar from "../components/Navbar/Navbar";
import DeviceContainer from "@/components/DeviceContainer/DeviceContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getLoginInfo,
  getUserAsync,
  selectAuthentication,
  selectLoginHistory,
  selectTokenInfo,
  setActive,
  setInActive,
} from "@/features/auth/authSlice";
import { redirect } from "next/navigation";
import { socket } from "./socket";

export default function Home() {
  const [currentDevice, setCurrentDevice] = useState();
  const dispatch = useDispatch<any>();
  const authentication = useSelector(selectAuthentication);
  const loginHistory = useSelector(selectLoginHistory);
  const tokenInfo = useSelector(selectTokenInfo);

  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getLoginInfo());
  }, [dispatch]);

  useEffect(() => {
    if (authentication === "failed") {
      return redirect("/login");
    }
  }, [authentication]);

  useEffect(() => {
    const device = loginHistory?.filter((history: { secretKey: string }) => {
      return history.secretKey === tokenInfo.sk;
    });
    setCurrentDevice(device[0]);
  }, [loginHistory]);

  useEffect(() => {
    if (!currentDevice) return;

    socket.emit("active", {
      currentDevice,
      login_history: loginHistory,
    });

    socket.on("device-active", ({ activeDevice }) => {
      dispatch(setActive(activeDevice));
    });

    socket.on("device-inactive", ({ inactiveDevice }) => {
      dispatch(setInActive(inactiveDevice));
    });

    return () => {
      socket.emit("offline", { currentDevice, login_history: loginHistory });
    };
  }, [socket, loginHistory]);

  return (
    <>
      <Navbar />
      <MainSection />
      <DeviceContainer />
    </>
  );
}
