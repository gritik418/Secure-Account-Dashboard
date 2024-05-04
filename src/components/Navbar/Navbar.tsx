import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { BsPersonPlusFill } from "react-icons/bs";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  logoutAsync,
  selectIsLoggedIn,
  selectUser,
} from "@/features/auth/authSlice";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Dispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAsync());
    dispatch(logout());
  };

  const handleChangePassword = () => {
    return router.push("/change-password");
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li>
            <Link href="/" className={styles.item}>
              <MdSpaceDashboard className={styles.icon} />{" "}
              <p className={styles.name}>Dashboard</p>
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

        {user && user?._id && (
          <Menu>
            <MenuButton>
              <div className={styles.profile}>
                <Avatar name="Dan Abrahmov" src="/images/avatar.png" />
                <p>{user.first_name}</p>
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem
                className={styles.menuItem}
                onClick={handleChangePassword}
              >
                <RiLockPasswordFill /> Change Password
              </MenuItem>
              <MenuItem className={styles.menuItem} onClick={handleLogout}>
                <FiLogOut /> Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
