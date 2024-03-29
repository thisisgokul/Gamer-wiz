import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ActiveTabsProps {
  isAdmin: boolean;
}

const ActiveTabs = ({ isAdmin }: ActiveTabsProps) => {
  const path = usePathname();
  return (
    <div className="flex flex-wrap gap-2 justify-center font-semibold text-gray-50 text-xl mb-8">
      <Link
        href={"/profile"}
        className={` ${path === "/profile" ? "Activetabs" : "tabs"}`}
      >
        Profile
      </Link>

      {isAdmin === true && (
        <>
          <Link
            href={"/category"}
            className={` ${path === "/category" ? "Activetabs" : "tabs"}`}
          >
            Category
          </Link>
          <Link
            href={"/additems"}
            className={` ${path === "/additems" ? "Activetabs" : "tabs"}`}
          >
            Add Items
          </Link>
          <Link
            href={"/users"}
            className={` ${path === "/users" ? "Activetabs" : "tabs"}`}
          >
            Users
          </Link>
          <Link
            href={"/all-orders"}
            className={` ${path === "/all-orders" ? "Activetabs" : "tabs"}`}
          >
            All Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default ActiveTabs;
