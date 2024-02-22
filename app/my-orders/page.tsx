"use client";
import Loader from "@/components/helpers/loader";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import OrderItem from "@/components/helpers/OrderItem";
import { Order } from "@/types";
import Footer from "@/components/shared/Footer";

const MyOrderPage: React.FC = () => {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: sessionData } = useSession();
  const userEmail = sessionData?.user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/create-order");
        setItems(data.filter((order: Order) => order.email === userEmail));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userEmail]);

  return (
    <>
      <div className="container bg-darkBlack h-screen px-4 py-8 mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-zinc-300">My Orders</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          items.map((order) => <OrderItem key={order._id} order={order} />)
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrderPage;
