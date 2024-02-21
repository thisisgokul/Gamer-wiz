"use client";
import ActiveTabs from "@/components/helpers/ActiveTabs";
import UseProfile from "@/components/helpers/UseProfile";
import Loader from "@/components/helpers/loader";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBackward } from "react-icons/fa";
import axios from "axios";
import { uploadImage } from "@/app/utils/cloudinary/uploadImage";;
import { toast } from "sonner";
import ItemForm from "@/components/shared/ItemForm";

const AddItemspage = () => {
  const { datas: profileData, loading } = UseProfile();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [itemname, setItemname] = useState("");


  useEffect(() => {
    if (!loading && profileData) {
      setIsAdmin(profileData.admin || false);
    }
  
  }, [loading, profileData, files]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center mt-3">
        <Loader />
        <span>Loading...</span>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="h-screen flex flex-col items-center mt-3">
        <span>You are not an admin.</span>
      </div>
    );
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      const uploadedFiles: { file: File; url: string }[] = [];

      for (const file of filesArray) {
        const uploadedImageUrl = await uploadImage(file);
        if (uploadedImageUrl) {
          uploadedFiles.push({ file, url: uploadedImageUrl });
        }
      }

      setFiles(uploadedFiles);
    }
  };

  const handleDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSetPrimary = (index: number) => {
    const updatedFiles = [...files];
    const primaryImage = updatedFiles.splice(index, 1)[0];
    updatedFiles.unshift(primaryImage);
    setFiles(updatedFiles);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (files.length === 0) {
        toast.error("Please upload at least one image.");
        return; 
      }
      const formdata = { itemname, description, price, category };  
      await axios.post("/api/add-items", { formdata, files });
      [setCategory, setPrice, setDescription, setItemname, 
      () => setFiles([])].forEach((setter) => setter(""));
      toast.success("Items Created Successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create Items");
    }
  };

  return (
    <>
      {isAdmin && (
        <>
          <ActiveTabs isAdmin={true} />
          <div className="flex mb-8 justify-center  items-center ">
            <Link
              className="flex font-bold justify-center text-lg text-center gap-4 text-white flex-grow max-w-xl px-2 flex-wrap py-2
         bg-secondary shadow-xl btnHover rounded-2xl"
              href={"/additems"}
            >
              <FaBackward size={22} /> <button>GO TO DISPLAY ITEMS</button>
            </Link>
          </div>
          <div className="sm:flex sm:flex-col md:flex md:flex-row flex-grow justify-center items-center">
            <button className="bg-secondary flex pr-2 btnHover border-2 border-pink-200 items-center text-white font-semibold shadow-xl rounded-3xl h-32 w-32 cursor-pointer relative">
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                multiple
                className="absolute cursor-pointer inset-0 opacity-0"
              />
              Upload Images
              <FaCloudUploadAlt size={45} />
            </button>

            <div className="p-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {files.map((fileObject, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(fileObject.file)}
                    alt={`Image ${index}`}
                    width={32}
                    height={32}
                    className="h-32 w-32"
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute bottom-1 right-2 
                     btnHover hover:text-red-600
                     bg-black bg-opacity-55
                   text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <MdDeleteSweep size={26} />
                  </button>
                  <button
                    onClick={() => handleSetPrimary(index)}
                    className="absolute bottom-0 left-2 btnHover bg-black bg-opacity-55
                     text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <FaStar />
                  </button>
                </div>
              ))}
            </div>

            <ItemForm onsubmit={handleFormSubmit} setCategory={setCategory}
            setItemname={setItemname} setDescription={setDescription} setPrice={setPrice}
             category={category} description={description} price={price}
            itemname={itemname}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AddItemspage;
