"use client";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  getLoginInfo,
  selectIsLoggedIn,
  selectLoginLoading,
  userLoginAsync,
} from "@/features/auth/authSlice";
import { redirect } from "next/navigation";

const Login = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<Dispatch<any>>();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoginLoading);

  const handleClick = () => setShow(!show);

  const handleUserLogin = () => {
    dispatch(userLoginAsync(userData));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getLoginInfo());
    } else {
      redirect("/");
    }
  }, [isLoggedIn]);

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-3xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?
            <a
              href="#"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          <div className="space-y-5 mt-10">
            <div className="mt-4">
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  placeholder="Enter Email"
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  id="email"
                  size="md"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <a
                  href="#"
                  title=""
                  className="text-sm font-semibold text-black hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-2">
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    name="password"
                    onChange={handleChange}
                    value={userData.password}
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            <div className="">
              {loading ? (
                <button
                  onClick={handleUserLogin}
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Processing ...
                </button>
              ) : (
                <button
                  onClick={handleUserLogin}
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Continue
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

export default Login;
