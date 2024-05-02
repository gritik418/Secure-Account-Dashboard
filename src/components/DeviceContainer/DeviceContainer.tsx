"use client";
import React from "react";
import styles from "./DeviceContainer.module.css";
import DeviceInfo, { HistoryType } from "../DeviceInfo/DeviceInfo";
import { useSelector } from "react-redux";
import { selectTokenInfo, selectUser } from "@/features/auth/authSlice";

const DeviceContainer = () => {
  const user = useSelector(selectUser);
  const tokenInfo = useSelector(selectTokenInfo);

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        {user &&
          user?.login_history &&
          user.login_history.map((history: HistoryType, index: number) => {
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
