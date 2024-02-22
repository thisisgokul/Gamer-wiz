import React from "react";
import { compatibleDevices } from "@/app/constants";
import { MdCategory } from "react-icons/md";
import { CardItems } from "@/types";

interface SingleItemTabProps {
  item: CardItems | null;
  onclick?: () => void; 
}

const SingleItemTab: React.FC<SingleItemTabProps> = ({ item, onclick }) => {
  return (
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
              onClick={onclick}
              className="bg-yellowGreen w-1/2 p-2 rounded-full mt-2"
            >
              Buy ₹{item?.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemTab;
