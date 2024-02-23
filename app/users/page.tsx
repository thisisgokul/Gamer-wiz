"use client";
import ActiveTabs from "@/components/helpers/ActiveTabs";
import UseProfile from "@/components/helpers/UseProfile";
import React, { useEffect, useState } from "react";
import UserList from "@/components/shared/UserList";
import axios from "axios";
import { toast } from "sonner";
import Loader2 from "@/components/helpers/Loader2";

const AllUsersPage = () => {
  const { datas: profileData, loading } = UseProfile();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userData, setUserData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/all-users/", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (!loading && profileData) {
      setIsAdmin(profileData.admin || false);
    }
    fetchUserData();
  }, [loading, profileData]);

  if (loading) {
    return (
      <div className="h-screen justify-center flex flex-col items-center mt-3">
        <Loader2 />
        <span>Loading...</span>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="h-screen flex flex-col items-center mt-3">
        <span>You are not an admin.</span>
      </div>
    );
  }

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const { checked } = e.target;
    handleUserUpdate(userId, checked);
  };

  const handleUserUpdate = async (userId: string, checked: boolean) => {
    try {
      setDataLoading(true);
      const { data } = await axios.put("/api/all-users/", { checked, userId });
      if (data) {
        fetchUserData();
      }
      setDataLoading(false);
      toast.success("Updated Admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isAdmin && (
        <div className="p-6 bg-zinc-200">
          <ActiveTabs isAdmin={true} />
          {dataLoading ? (
            <div className="text-xl flex justify-center font-bold">
              <Loader2 />
            </div>
          ) : (
            <UserList onchange={handleCheckboxChange} userData={userData} />
          )}
        </div>
      )}
    </>
  );
};

export default AllUsersPage;
