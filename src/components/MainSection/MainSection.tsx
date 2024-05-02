import Image from "next/image";
import React from "react";
import styles from "./MainSection.module.css";
import Link from "next/link";

const MainSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <Image
          src={"/images/secure-img.png"}
          height={100}
          width={80}
          alt="icon"
        />
        <h1 className={styles.heading}>Manage Access and Devices</h1>

        <p className={styles.content}>
          These signed-in devices have recently been active on this account. You
          can signout unfamiliar devices or{" "}
          <Link href={"/"} className={styles.link}>
            change your password
          </Link>{" "}
          for added security.
        </p>
      </div>
    </div>
  );
};

export default MainSection;
