"use client";
import Carousel from "@/components/helpers/Carousel";
import Loader from "@/components/helpers/loader";
import { CardItems } from "@/types";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { loadScript } from "@/lib/utils";
import SingleItemTab from "@/components/shared/SingleItemTab";

const SinglePage = () => {
  const { id } = useParams();
  const [pictures, setPictures] = useState([]);
  const [item, setItem] = useState<CardItems | null>(null);
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const { status } = session;
  const userData = session.data?.user;
  let email = userData?.email;
  let userName = userData?.name;

  const router = useRouter();

  useEffect(() => {
    fetchCategoryById();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  function fetchCategoryById() {
    setLoading(true);
    try {
      if (!id) {
        return;
      }
      fetch("/api/add-items/single-data", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setItem(data);
          const pictureUrls = data.pictures.map((picture: string) => picture);
          setPictures(pictureUrls);
          setLoading(false);
        });
    } catch (error) {
      console.error("An error occurred during fetchCategoryById:", error);
      setLoading(false);
    }
  }

  const handlePayment = async () => {
    try {
      if (status === "unauthenticated") {
        toast.error("please login to continue");
        router.push("/");
        return;
      }
      toast.info("loading payment please wait");
      const response = await axios.post("/api/create-payment", {
        amount: item?.price,
      });
      const order = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_key_id,
        amount: item?.price,
        currency: "INR",
        name: "GamerWiz pvt limited",
        description: "Game Payment",

        order_id: order.id,
        handler: function () {
          createOrder();
        },
        prefill: {
          email: email,
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
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
      router.push("/");
    } catch (error) {
      console.log(error);
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
        </>
      )}
    </div>
  );
};

export default SinglePage;
