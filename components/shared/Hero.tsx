"use client";
import Image from "next/image";
import hero from "@/public/hero2.png";
import arrow from "@/public/icons/arrow.svg";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Hero = () => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center md:items-start">
      <div className="flex flex-col justify-center md:mt-14 px-8">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-yellowGlight text-center sm:text-left">
          Unleash Your Gaming Fantasy
        </h1>
        <p className="text-sm sm:text-lg text-zinc-100 mb-8 text-center sm:text-left">
          Dive into a world of unparalleled gaming experiences. Discover the
          latest titles, connect with fellow gamers, and elevate your gaming
          adventure to new heights.
        </p>
        <div className="flex sm:justify-start justify-center items-center gap-2">
          <Link href={isAuthenticated ? "#" : "/login"}>
            <button className="bg-coral-blue px-3 py-1 rounded-full flex btnHover text-primary text-sm md:px-4 md:py-2 md:text-base">
              {isAuthenticated ? "Order now" : "Login"}
              <span>
                <Image src={arrow} alt="arrow" />
              </span>
            </button>
          </Link>
          <Link href={isAuthenticated ? "#" : "/register"}>
            <button className="bg-secondary text-white px-3 py-1 rounded-full text-sm md:px-4 md:py-2 md:text-base">
              {isAuthenticated ? "Explore More" : "Register"}
            </button>
          </Link>
        </div>
      </div>
      <div className="relative h-60 sm:h-[600px] w-full overflow-hidden">
        <div className="animate-heroMove ">
          <Image src={hero} alt="hero" className="h-60 sm:h-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
