"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import defaultImage from "@/public/defaultImage.jpg";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const session = useSession();
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  const { status } = session;

  const handleToggleNav = () => {
    setNavOpen(!isNavOpen);
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
            <Link href="/profile" className="text-white flex gap-3 font-bold">
              {userName}
              <Image
              src={userData?.image! || defaultImage}
              width={40}
              height={20}
              className="rounded-full h-12  w-12 hidden md:flex sm:hidden"
              alt="profile"
            />
            </Link>
           
            <button
              onClick={() => signOut()}
              className="px-4 py-1.5 text-white bg-coral-blue rounded-full"
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href="/login" className="text-gray-800 font-bold">
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
