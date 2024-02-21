"use client";
import Carousel from "@/components/helpers/Carousel";
import Loader from "@/components/helpers/loader";
import { compatibleDevices } from "@/app/constants";
import { CardItems } from "@/types";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { loadScript } from "@/lib/utils";

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
      axios.post("/api/add-items/single-data", { _id: id }).then((res) => {
        const data = res.data;
        setItem(data);
        const pictureUrls = data.pictures.map((picture: string) => picture);
        setPictures(pictureUrls);
        setLoading(false);
      });
    } catch (error) {}
  }

  const handlePayment = async () => {
    try {
     
      if (status === "unauthenticated") {
        toast.error("please login to continue");
        router.push("/");
        return;
      }
      toast.info("loading payment please wait")
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
        picture:pictures[0],
        itemName: item?.name,
        price: item?.price
      };
       await axios.post("/api/create-order/", data);
        router.push("/")
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
          <div className="flex flex-col bg-darkBlack lg:flex-row ">
            <div className="lg:w-2/3 padding">
              <h1 className="text-white text-5xl font-semibold border-b-2 border-green-500 inline-block mb-3">
                {item?.name}
              </h1>
              <h2 className="text-zinc-400 text-2xl mb-3">{item?.category}</h2>
              <p className="text-zinc-300 text-xl mb-6 max-w-screen-md">
                {item?.description}
              </p>
            </div>
            <div className="lg:w-1/2 padding lg:pl-6 mt-6 lg:mt-0">
              <div className="text-zinc-400 p-4 rounded-3xl shadow-inner shadow-yellowGlight bg-metalicblack">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="lg:pr-4">
                    <h2 className="text-xl font-semibold">Compatible With</h2>
                    <div className="flex flex-wrap mt-3 gap-3">
                      {compatibleDevices.map((device, index) => (
                        <div
                          key={index}
                          className="flex rounded-xl text-xl bg-darkBlack p-2 gap-1 flex-col justify-center items-center mt-2"
                        >
                          <device.Icon />
                          <span className="ml-2">{device.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0">
                    <h2 className="text-xl font-semibold">Genre</h2>
                    <div className="flex mt-3 rounded-xl text-xl bg-darkBlack p-3 padding-x gap-1 flex-col justify-center items-center">
                      <MdCategory />
                      <span className="ml-2">{item?.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center text-black font-bold text-lg items-center btnHover my-5">
                  <button
                  onClick={handlePayment}
                  className="bg-yellowGreen  w-1/2 p-2 rounded-full mt-2">
                    Buy ₹{item?.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePage;
