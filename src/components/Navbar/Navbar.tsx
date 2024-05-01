import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { BsPersonPlusFill } from "react-icons/bs";

const Navbar = () => {
  const isLoggedIn = true;

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li>
            <Link href="/" className={styles.item}>
              <MdSpaceDashboard className={styles.icon} /> Dashboard
            </Link>
          </li>
        </ul>
        {!isLoggedIn && (
          <>
            <ul className={styles.navItems}>
              <li>
                <Link href="/" className={styles.item}>
                  <FiLogIn className={styles.icon} /> Login
                </Link>
              </li>
            </ul>
            <ul className={styles.navItems}>
              <li>
                <Link href="/" className={styles.item}>
                  <BsPersonPlusFill className={styles.icon} /> Signup
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
