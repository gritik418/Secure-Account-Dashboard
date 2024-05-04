import React from "react";
import styles from "./DeviceInfo.module.css";
import { MdOutlineAccessTime } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { signOutFromOtherDeviceAsync } from "@/features/auth/authSlice";

type ClientType = {
  engine: string;
  engineVersion: string;
  name: string;
  type: string;
  version: string;
};

type DeviceType = {
  brand: string;
  model: string;
  type: string;
};

type OsType = {
  name: string;
  platform: string;
  version: string;
};

type HistoryDeviceType = {
  bot: any;
  client: ClientType;
  device: DeviceType;
  os: OsType;
};

export type HistoryType = {
  device: HistoryDeviceType;
  secretKey: string;
  createdAt: string;
  active: boolean;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
};

const DeviceInfo = ({
  history,
  tokenInfo,
}: {
  history: HistoryType;
  tokenInfo: { id: string; sk: string; iat: number };
}) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const date = new Date(history.updatedAt);

  const handleSignoutFromOtherDevice = () => {
    dispatch(signOutFromOtherDeviceAsync(history._id));
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          {history?.device?.os?.name}{" "}
          {`${history?.device?.client?.type
            ?.at(0)
            ?.toUpperCase()}${history?.device?.client?.type?.slice(1)}`}{" "}
          -{" "}
          {`${history?.device?.client?.name
            ?.at(0)
            ?.toUpperCase()}${history?.device?.client?.name?.slice(1)}`}
        </p>
      </div>

      {tokenInfo.sk === history?.secretKey && (
        <div className={styles.float}>Current device</div>
      )}

      <div className={styles.deviceInfo}>
        <p>
          {history?.device?.device?.brand} {history?.device?.device?.model} -{" "}
          {`${history?.device?.device?.type
            ?.at(0)
            ?.toUpperCase()}${history?.device?.device?.type?.slice(1)}`}
        </p>
      </div>

      <div className={styles.time}>
        <MdOutlineAccessTime /> <p>{date.toUTCString()}</p>
      </div>

      {tokenInfo.sk !== history?.secretKey && (
        <div className={styles.actions}>
          <button className={styles.btn} onClick={handleSignoutFromOtherDevice}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceInfo;
