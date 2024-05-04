"use client";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  changePasswordAsync,
  selectChangeErrors,
  selectChangeLoading,
  selectChangeMessage,
  selectIsLoggedIn,
} from "@/features/auth/authSlice";
import { redirect } from "next/navigation";

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const dispatch = useDispatch<Dispatch<any>>();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectChangeLoading);
  const errors = useSelector(selectChangeErrors);
  const changeMessage = useSelector(selectChangeMessage);

  const handleClick = () => setShow(!show);

  const handleChangePassword = () => {
    dispatch(changePasswordAsync({ userData }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/login");
    }
  }, [isLoggedIn]);

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-lg">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-3xl font-bold leading-tight text-black">
            Change your Password
          </h2>
          <div className="space-y-5 mt-10">
            <div className="mt-4">
              <label
                htmlFor="old_password"
                className="text-base font-medium text-gray-900"
              >
                Old Password
              </label>
              <div className="mt-2">
                <Input
                  placeholder="Enter Old Password"
                  type="text"
                  name="old_password"
                  value={userData.old_password}
                  onChange={handleChange}
                  id="old_password"
                  size="md"
                />
              </div>
              <p className="h-4 mt-2 text-red-400 text-sm font-semibold">
                {errors.old_password}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="new_password"
                  className="text-base font-medium text-gray-900"
                >
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    name="new_password"
                    onChange={handleChange}
                    value={userData.new_password}
                    type={show ? "text" : "password"}
                    placeholder="Enter New Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>
              <p className="h-4 mt-2 text-red-400 text-sm font-semibold">
                {errors.new_password}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="new_password_confirmation"
                  className="text-base font-medium text-gray-900"
                >
                  Confirm New Password
                </label>
              </div>
              <div className="mt-2">
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    name="new_password_confirmation"
                    onChange={handleChange}
                    value={userData.new_password_confirmation}
                    type={show ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            <div className="text-green-600 text-xl text-center mt-7">
              {changeMessage}
            </div>
            <div className="">
              {loading ? (
                <button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Processing ...
                </button>
              ) : (
                <button
                  onClick={handleChangePassword}
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Change Password
                  <FaLongArrowAltRight className="ml-4 text-2xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
