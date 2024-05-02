import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { BsPersonPlusFill } from "react-icons/bs";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/authSlice";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const isLoggedIn = true;
  const user = useSelector(selectUser);

  console.log(user);

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
              <MenuItem className={styles.menuItem}>
                <RiLockPasswordFill /> Change Password
              </MenuItem>
              <MenuItem className={styles.menuItem}>
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
