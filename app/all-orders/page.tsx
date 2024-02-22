"use client";
import ActiveTabs from "@/components/helpers/ActiveTabs";
import Loader2 from "@/components/helpers/Loader2";
import OrderItem from "@/components/helpers/OrderItem";
import UseProfile from "@/components/helpers/UseProfile";
import { Order } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllOrderPage = () => {
  const { datas: profileData, loading } = UseProfile();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [items, setItems] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      setLoadingData(true);
      const { data } = await axios.get("/api/create-order");
      setItems(data);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!loading && profileData) {
      setIsAdmin(profileData.admin || false);
    }
    fetchOrders();
  }, [loading, profileData]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center mt-3">
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
  return (
    <>
      {isAdmin && (
        <div className="p-6 bg-zinc-100 h-screen">
          <ActiveTabs isAdmin={true} />
          {loadingData ? (
            <div className="h-screen flex justify-center flex-col items-center mt-3">
              <Loader2 />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {items.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllOrderPage;
