"use client";
import ActiveTabs from "@/components/helpers/ActiveTabs";
import Loader2 from "@/components/helpers/Loader2";
import UseProfile from "@/components/helpers/UseProfile";
import Loader from "@/components/helpers/loader";
import ItemCard from "@/components/shared/ItemCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";

const AllItemsPage = () => {
  const { datas: profileData, loading } = UseProfile();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [addedItems, setAddedItems] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const fetchAllItems = async () => {
    try {
      setDataLoading(true);
      const response = await fetch("/api/add-items", {
        cache: "no-store",
      });
      const data = await response.json();
      setAddedItems(data);
      setDataLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    if (!loading && profileData) {
      setIsAdmin(profileData.admin || false);
    }
    fetchAllItems();
  }, [loading, profileData]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center mt-3">
        <Loader />
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

  return (
    <>
      {isAdmin && (
        <div className="p-6 h-screen">
          <ActiveTabs isAdmin={true} />
          <div className="flex justify-center  items-center padding-x">
            <Link
              className="flex font-bold justify-center text-xl text-center gap-4 text-white flex-grow max-w-xl px-2 flex-wrap py-2 bg-gray-800 rounded-2xl"
              href={"/additems/new"}
            >
              <button>ADD NEW ITEM</button> <IoArrowForwardCircle size={38} />
            </Link>
          </div>
          <div className="flex justify-center mt-10">
            {dataLoading ? (
              <div className="text-xl font-bold">
                <Loader2 />
              </div>
            ) : (
              <div className="grid sm:grid-cols-4  grid-cols-2 gap-4">
                {addedItems.map((item, index) => (
                  <ItemCard key={index} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllItemsPage;
