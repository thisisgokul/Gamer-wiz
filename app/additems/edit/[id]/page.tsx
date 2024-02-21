"use client";
import { uploadImage } from "@/app/utils/cloudinary/uploadImage";
import ActiveTabs from "@/components/helpers/ActiveTabs";
import ItemForm from "@/components/shared/ItemForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaSpinner, FaStar } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "sonner";

const Editpage = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [itemname, setItemname] = useState("");
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const { id } = useParams();
  const _id: string = Array.isArray(id) ? id[0] : id;

  const router = useRouter();

  useEffect(() => {
    fetchCategoryById();
  }, []);

  function fetchCategoryById() {
    setLoading(true);
    try {
      if (!id) {
        return;
      }
      axios.post("/api/add-items/single-data", { _id: id }).then((res) => {
        const data = res.data;
        const pictureUrls = data.pictures.map((picture: string) => ({
          file: null,
          url: picture,
        }));
       
        setFiles(pictureUrls);
        setLoading(false);
      });
    } catch (error) {}
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
    event.preventDefault();
    try {
      const data = { category, price, name: itemname, description };
      await axios.put("/api/add-items/edit-data", { data, id, files });
      setLoading(false);
      toast.success(" Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update");
    }
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`/api/add-items/delete-data/${id}`);
      router.push("/additems");
      toast.info("Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin" size={50} />
        </div>
      ) : (
        <>
          <ActiveTabs isAdmin={true} />
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
              {files.map((images, index) => (
                <div key={index} className="relative">
                  <img
                    src={images.url}
                    alt={`Image ${index}`}
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

            <ItemForm
              onsubmit={handleFormSubmit}
              id={_id}
              setCategory={setCategory}
              setItemname={setItemname}
              setDescription={setDescription}
              setPrice={setPrice}
              category={category}
              description={description}
              price={price}
              itemname={itemname}
              loading={loading}
              onclick={handleDeleteItem}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Editpage;
