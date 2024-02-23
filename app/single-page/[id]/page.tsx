"use client";
import Carousel from "@/components/helpers/Carousel";
import Loader from "@/components/helpers/loader";
import SingleItemTab from "@/components/shared/SingleItemTab";
import Footer from "@/components/shared/Footer";
import { CardItems } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { loadScript } from "@/lib/utils";
import { useParams } from "next/navigation";

const SinglePage = () => {
  const { id } = useParams();
  const [pictures, setPictures] = useState<string[]>([]);
  const [item, setItem] = useState<CardItems | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: sessionData, status: sessionStatus } = useSession();
  const userData = sessionData?.user;
  const email = userData?.email;
  const userName = userData?.name;
  const router = useRouter();

  useEffect(() => {
    fetchCategoryById();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  async function fetchCategoryById() {
    setLoading(true);
    try {
      if (!id) return;
      const response = await fetch("/api/add-items/single-data", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setItem(data);
      setPictures(data.pictures.map((picture: string) => picture));
    } catch (error) {
      console.error("An error occurred during fetchCategoryById:", error);
      toast.error("Failed to fetch item details");
    } finally {
      setLoading(false);
    }
  }

  const handlePayment = async () => {
    try {
      if (sessionStatus === "unauthenticated") {
        toast.error("Please login to continue");
        router.push("/login");
        return;
      }
      toast.info("Loading payment, please wait...");
      const response = await axios.post("/api/create-payment", {
        amount: item?.price,
      });
      const order = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_key_id,
        amount: item?.price,
        currency: "INR",
        name: "GamerWiz Pvt Limited",
        description: "Game Payment",
        order_id: order.id,
        handler: createOrder,
        prefill: {
          email: email,
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error during handlePayment:", error);
      toast.error("Failed to initiate payment");
    }
  };

  const createOrder = async () => {
    try {
      const data = {
        userName: userName,
        email: email,
        picture: pictures[0],
        itemName: item?.name,
        price: item?.price,
      };
      await axios.post("/api/create-order/", data);
      router.push("/my-orders");
    } catch (error) {
      console.error("Error during createOrder:", error);
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="sm:h-full h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <Carousel images={pictures} />
          <SingleItemTab item={item} onclick={handlePayment} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default SinglePage;
