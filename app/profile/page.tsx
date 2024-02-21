"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { uploadImage } from "../utils/cloudinary/uploadImage";
import defaultImage from "@/public/defaultImage.jpg";
import { userData } from "@/types";
import AddressForm from "@/components/shared/AddressForm";
import { toast } from "sonner";
import Loader from "@/components/helpers/loader";
import ActiveTabs from "@/components/helpers/ActiveTabs";

const Profilepage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<userData>({});
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const session = useSession();
  const { status } = session;
  const sessionUserData = session.data?.user;

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetch("/api/profile", {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setIsAdmin(data.admin);
          setFetchLoading(false);
        })
        .catch((error) => console.error("Error fetching user profile:", error));
    }
  }, [session, status]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const uploadedImageUrl = await uploadImage(file);

    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleProfileUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      await axios.put(
        "/api/profile",
        {
          ...formdata,
          image: imageUrl || undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("User has been Updated", { position: "top-center" });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  return (
    <div className="padding-x pt-3 bg-darkBlack py-6">
      {status === "loading" ||
        (fetchLoading && (
          <div className=" items-center h-screen flex flex-col mt-3 ">
            <Loader />
            <span> Loading...</span>
          </div>
        ))}
      {status === "authenticated" && (
        <>
          <ActiveTabs isAdmin={isAdmin} />

          <div className=" flex gap-3 flex-col md:flex-row items-center justify-center">
            <div className="p-8 h-1/4 bg-metalicblack rounded-xl shadow-xl">
              <Image
                src={imageUrl || userData.image || defaultImage}
                alt="image"
                width={150}
                height={150}
                className="rounded-full"
              />
              <div className="flex flex-col cursor-pointer">
                <div className="flex flex-col overflow-hidden rounded-md">
                  <label className="px-4 py-2 mt-2 text-sm font-medium text-white bg-red-700 rounded-md cursor-pointer mx-9">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      className=" w-full hidden h-full cursor-pointer"
                    />
                    select file
                  </label>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="px-4 py-2 mt-2 text-sm font-medium text-white bg-coral-blue rounded-md cursor-pointer mx-9"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>

            <AddressForm
              sessionUserData={sessionUserData}
              userData={userData}
              loading={loading}
              onChange={handleChange}
              onSubmit={handleProfileUpdate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Profilepage;
