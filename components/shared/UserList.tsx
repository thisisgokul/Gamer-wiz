"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaulImg from "@/public/defaultImage.jpg";
import axios from "axios";
import { User } from "@/types";

interface UserListProps {
  onchange: (e: React.ChangeEvent<HTMLInputElement>, userId: string) => void;
  userData: User[];
}

const UserList: React.FC<UserListProps> = ({ onchange, userData }) => {
  const secret =process.env.NEXT_PUBLIC_ADMIN;
  return (
    <>
      <div className="flex flex-grow flex-col items-center gap-4 px-4 py-4">
        {userData.map(
          (user: User) =>
            user.email !== secret && (
              <div
                key={user._id}
                className="bg-gray-100 sm:w-1/2 flex flex-col md:flex-row rounded-lg shadow-md p-4 md:justify-between items-center w-full"
              >
                <Image
                  src={user.image || defaulImg}
                  alt="sample"
                  width={32}
                  height={32}
                  className="rounded-full mb-4 md:mb-0"
                />
                <div className="text-center md:text-left">
                  <h1 className="text-xl md:text-2xl font-bold text-blue-700">
                    {user.name}
                  </h1>
                  <h2 className="text-base md:text-lg text-gray-700 font-semibold">
                    {user.email}
                  </h2>
                </div>
                <label className="flex items-center ml-2 text-base md:text-lg text-red-700 font-medium">
                  <input
                    onChange={(e) => onchange(e, user._id)}
                    type="checkbox"
                    id="adminPermission"
                    className="form-checkbox h-5 w-5 shadow-xl rounded-xl text-indigo-800 mr-2"
                    defaultChecked={user.admin}
                  />
                  Admin: {user.admin ? "True" : "false"}
                </label>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default UserList;
