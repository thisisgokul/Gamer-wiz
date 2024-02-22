import { CardItems } from "@/types";
import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";

const ItemCard: React.FC<{ item: CardItems }> = ({ item }) => {
  const imageUrl = item.pictures?.[0];
  return (
    <div
      className="relative w-36 sm:w-64 flex-wrap bg-white shadow-lg rounded-lg 
    overflow-hidden hover:shadow-xl transition duration-300 ease-in-out
     transform hover:-translate-y-1 hover:scale-105"
    >
      <img
        className="w-full h-64 object-cover"
        src={imageUrl}
        alt={item.name}
      />
      <div className="px-6 py-4">
        <h3 className="font-semibold text-coral-blue text-lg mb-2">
          {item.name}
        </h3>
        <p className="text-gray-700 text-base">{item.category}</p>
        <p className="text-gray-700 text-base">Price: ${item.price}</p>
      </div>

      <div className="absolute top-0 right-0 m-4">
        <Link href={`/additems/edit/${item._id}`}>
          <div className="relative">
            <div className="bg-black btnHover bg-opacity-30 rounded-full p-2 hover:bg-opacity-100 cursor-pointer">
              <MdEdit size={25} className="text-gray-200 hover:text-white " />
            </div>
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white text-xs font-semibold px-1 py-0.5 rounded-full">
              Edit
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
