"use client";
import {
  selectEmail,
  selectIsLoggedIn,
  selectVerifyErrors,
  selectVerifyLoading,
  verifyEmailAsync,
} from "@/features/auth/authSlice";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Verify = () => {
  const [otp, setOtp] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();

  const email = useSelector(selectEmail);
  const loading = useSelector(selectVerifyLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const errors = useSelector(selectVerifyErrors);

  const handleClick = () => {
    dispatch(verifyEmailAsync({ email, otp }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      redirect("/");
    }
  }, [isLoggedIn]);

  if (!email) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center justify-center px-4 py-6 sm:px-6 sm:py-16 lg:px-8 lg:py-12">
      <div className="max-w-sm lg:max-w-[60%] xl:max-w-lg">
        <div className="mt-12 w-full flex items-center justify-center flex-col">
          <Image
            src={"/images/verify-img.jpeg"}
            height={120}
            width={200}
            alt="image"
          />
          <h1 className="text-3xl mt-4">Email Verification</h1>
          <p className="text-lg mt-6 text-center font-normal">
            We emailed you a six-digit code to{" "}
            <span className="font-bold">{email}</span>. Enter the code below to
            confirm your email address.
          </p>

          <HStack className="mt-10">
            <PinInput
              type="number"
              value={otp}
              onChange={(text) => setOtp(text)}
              placeholder=""
              autoFocus
              size={"lg"}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <button
            onClick={handleClick}
            className="mt-12 transition-all duration-200 ease-in-out bg-[#2680bc] hover:bg-[#5694bc] uppercase text-white text-2xl py-2 w-[300px] rounded-lg"
          >
            {!loading ? "Verify" : "Processing..."}
          </button>

          <p className="h-8 mt-6 text-red-400 text-md font-semibold">
            {errors}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
