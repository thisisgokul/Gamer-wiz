import React from "react";
import Image from "next/image";
import { CardItems } from "@/types";
import Link from "next/link";

const ImageCard: React.FC<{ items: CardItems[] }> = ({ items }) => {
  return (
    <>
      {items.map((data: CardItems) => (
        <div
          key={data._id}
          className="flex items-start transition-transform transform hover:scale-105"
        >
          <div className="bg-zinc-900  hover:bg-metalicblack rounded-3xl hover:border-2 border-yellowGreen p-4 shadow-xl hover:shadow-2xl transition-all">
            <div className="relative mb-4 overflow-hidden rounded-xl btnHover">
              {data.pictures?.[0] ? (
                <Image
                  src={data.pictures[0]}
                  alt="title"
                  width={288}
                  height={272}
                  className="rounded-md h-52"
                />
              ) : (
                <div className="w-72 h-72 bg-gray-300"></div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold mb-2 text-center text-white">
                {data.name}
              </h3>
              <p className="text-yellowGreen text-sm sm:text-base md:text-lg lg:text-xl mb-4">
                {data.category}
              </p>
              <div className="flex justify-center items-center gap-2">
                <p className="text-gray-200 mt-3 text-sm sm:text-base md:text-lg lg:text-xl mb-4">
                  ${data.price}
                </p>
                <Link href={`/single-page/${data._id}`}><button className="bg-yellowGreen text-white px-4 py-1 rounded-full hover:bg-coral-dark-blue transition-all">
                  Buy Now
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ImageCard;
