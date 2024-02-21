"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "@/public/defaultImage.jpg";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const session = useSession();
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  const { status } = session;

  const handleToggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  return (
    <header className="flex flex-col sm:flex-row gap-3 items-center justify-between py-3 sm:p-5">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-secondary font-bold text-4xl">
          GamerWiz
        </Link>

        <div className="mx-auto hidden md:flex sm:hidden">
          <Link className="navlinks" href="/">
            Home
          </Link>
          <Link className="navlinks" href="/">
            Menu
          </Link>
          <Link className="navlinks" href="/about">
            About
          </Link>
          <Link className="navlinks" href="/">
            Contact
          </Link>
        </div>

        <button
          onClick={handleToggleNav}
          className="sm:hidden text-gray-500 focus:outline-none "
        >
          {isNavOpen ? "Close" : "Open"}
        </button>
      </div>

      <nav
        className={`${
          isNavOpen ? "flex flex-col" : "hidden"
        } sm:flex gap-3 text-gray-500  text-lg font-semibold items-center`}
      >
        {status === "authenticated" && (
          <>
            <nav className="sm:hidden flex flex-col items-center">
              <Link href="/">Home</Link>
              <Link href="/">Menu</Link>
              <Link href="/about">About</Link>
              <Link href="/">Contact</Link>
            </nav>
            <div className="relative">
              <div className="flex items-center">
              <Link className="flex gap-3  items-center" href={"/profile"}>
                <h2 className="text-white font-bold italic">{userName}</h2></Link>
                <Image
                onClick={handleProfileClick} 
                  src={userData?.image || defaultImage}
                  width={40}
                  height={40}
                  className="rounded-full h-12 w-12 border-4 shadow-xl
                  border-yellowGreen cursor-pointer sm:block hidden" 
                  alt="profile"
                />
              </div>
              {showProfileOptions && (
                <div className="absolute top-full right-0 mt-3 sm:block hidden bg-white shadow-md rounded-md py-2 w-40 sm:w-auto">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href="/login" className="text-gray-50 font-bold">
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-1.5 text-white bg-coral-blue rounded-full"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
