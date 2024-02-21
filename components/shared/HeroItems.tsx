"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Loader from "../helpers/loader";
import { BiSearch } from "react-icons/bi";
import { CardItems } from "@/types";
import ImageCard from "./ImageCard";
import heroitem1 from "@/public/heroitem1.png";
import heroitem2 from "@/public/heroitem2.png";

const HeroItems = () => {
  const [items, setItems] = useState<CardItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchDataItems();
  }, []);

  const fetchDataItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/add-items",{cache: "no-store",});
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    // search Filter
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // Category Filter
    const matchCategory = selectedCategory === "" || item.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="grid bg-gray-950 grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="relative h-60 md:h-auto w-full col-span-1">
        <Image src={heroitem1} alt="Hero Item 1" />
      </div>
      <div className="text-center   md:text-left col-span-1 md:col-span-1">
        <h2 className="text-4xl font-bold mb-4 text-secondary">
          Explore and Order Now!
        </h2>
        <p className="text-lg text-gray-100 mb-8">
          Explore our collection of hero items. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </div>

      <div className="relative h-60 md:h-auto w-full col-span-1">
        <Image src={heroitem2} alt="Hero Item 2" />
      </div>
      <div className="col-span-3 md:col-span-3 padding-x flex flex-col md:flex-row md:items-center md:justify-evenly">
        <div className="mb-4 md:mb-0 relative flex items-center">
          <input
            type="text"
            placeholder="Search Games..."
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            className="sm:px-14 px-2 py-2 border mt-2 text-xl border-yellowGlight rounded-md focus:outline-none bg-metalicblack text-white"
          />
          <div className="ml-2 text-yellowGlight bg-metalicblack px-2 py-2 border-2 border-yellowGreen rounded-md mt-2">
            <BiSearch size={28} />
          </div>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e)=>setSelectedCategory(e.target.value)}
            className="px-14 py-2 cursor-pointer border mt-2 text-xl border-yellowGlight rounded-md focus:outline-none bg-metalicblack text-white"
          >
            <option value="">Select Category</option>
            {Array.from(
              new Set(items.map((data: CardItems) => data.category))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-screen gap-8">
      {loading ? (
          <div className="flex justify-center items-center w-screen flex-col">
            <Loader />
            <p className="text-white ">Loading...</p>
          </div>
        ) : filteredItems.length ? (
          <ImageCard items={filteredItems} />
        ) : (
          <p className="text-yellowGreen text-center col-span-full">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default HeroItems;
