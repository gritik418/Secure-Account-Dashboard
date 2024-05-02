"use client";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
// import {
//   getSignupInfo,
//   selectIsLoggedIn,
//   selectSignupLoading,
//   userSignupAsync,
// } from "@/features/auth/authSlice";
import { redirect } from "next/navigation";
import { selectIsLoggedIn } from "@/features/auth/authSlice";
import Link from "next/link";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
    password_confirmation: "",
  });
  const dispatch = useDispatch<Dispatch<any>>();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = false; //useSelector(selectSignupLoading);

  const handleClick = () => setShow(!show);

  const handleUserSignup = () => {
    console.log(userData);
    // dispatch(userSignupAsync(userData));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      //   dispatch(getSignupInfo());
    } else {
      redirect("/");
    }
  }, [isLoggedIn]);

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-6 sm:px-6 sm:py-16 lg:px-8 lg:py-12">
        <div className="xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-lg">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-3xl font-bold leading-tight text-black">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <div className="space-y-5 mt-10">
            <div className="space-y-5 mt-10">
              <div className="mt-4">
                <label
                  htmlFor="first_name"
                  className="text-base font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <Input
                    placeholder="Enter first name"
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    id="first_name"
                    size="md"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="last_name"
                  className="text-base font-medium text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <Input
                    placeholder="Enter last name"
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    id="last_name"
                    size="md"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="username"
                  className="text-base font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <Input
                    placeholder="Enter Username"
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    id="username"
                    size="md"
                  />
                </div>
              </div>
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
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password_confirmation"
                    className="text-base font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      name="password_confirmation"
                      onChange={handleChange}
                      value={userData.password_confirmation}
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
              <div className="">
                {loading ? (
                  <button
                    onClick={handleUserSignup}
                    type="button"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Processing ...
                  </button>
                ) : (
                  <button
                    onClick={handleUserSignup}
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
      </div>
    </section>
  );
};

export default Signup;
