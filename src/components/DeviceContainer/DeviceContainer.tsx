"use client";
import React, { useEffect } from "react";
import styles from "./DeviceContainer.module.css";
import DeviceInfo, { HistoryType } from "../DeviceInfo/DeviceInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginInfo,
  selectLoginHistory,
  selectTokenInfo,
  selectUser,
} from "@/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";

const DeviceContainer = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const loginHistory = useSelector(selectLoginHistory);
  const tokenInfo = useSelector(selectTokenInfo);

  useEffect(() => {
    dispatch(getLoginInfo());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        {loginHistory &&
          loginHistory &&
          loginHistory.map((history: HistoryType, index: number) => {
            return (
              <DeviceInfo
                key={history._id}
                tokenInfo={tokenInfo}
                history={history}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DeviceContainer;
