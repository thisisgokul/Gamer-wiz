"use client";
import React, { useEffect, useState } from "react";
import ActiveTabs from "@/components/helpers/ActiveTabs";
import UseProfile from "@/components/helpers/UseProfile";
import axios from "axios";
import { toast } from "sonner";
import { Category } from "@/types";
import Loader2 from "@/components/helpers/Loader2";

const CategoryPage = () => {
  const { datas: profileData, loading } = UseProfile();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [category, setCategory] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editedCategory, setEditedCategory] = useState<Category>();

  useEffect(() => {
    if (!loading && profileData) {
      setIsAdmin(profileData.admin || false);
    }

    fetchCategory();
  }, [loading, profileData]);

  if (loading) {
    return (
      <div className="h-screen justify-center flex flex-col items-center">
        <Loader2 />
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

  async function fetchCategory() {
    try {
      setLoadingData(true);
      const response = await fetch("/api/categories", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
      setLoadingData(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  }
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editedCategory) {
        const editedCategoryID = editedCategory._id;
        await axios.put("api/categories", { category, editedCategoryID });
        toast.info("Category Updated successfully");
        setEditedCategory(undefined);
        setCategory("");
      } else {
        await axios.post("api/categories", { category });
        setCategory("");
        toast.success("Category added successfully");
      }

      fetchCategory();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add category");
    }
  };

  const handleDelete = async (categoryToDelete: Category) => {
    try {
      const deleteCategoryId = categoryToDelete._id;
      console.log(deleteCategoryId);

      await axios.delete(`api/categories/${deleteCategoryId}`);

      toast.warning("Category deleted successfully");
      fetchCategory();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <>
      {isAdmin && (
        <div className="p-6 bg-zinc-200">
          <ActiveTabs isAdmin={true} />
          {loadingData ? (
            <div className="h-screen justify-center flex flex-col items-center">
              <Loader2 />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mx-8">
              <form
                className="p-8 bg-gray-50 rounded-xl shadow-xl w-full max-w-4xl"
                onSubmit={handleFormSubmit}
              >
                <label className="text-infotext flex justify-center">
                  Add or Edit Category
                </label>
                <div className="flex justify-center gap-2 items-center">
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="inputs border-blue-300 w-full max-w-xl"
                    type="text"
                  />
                  <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-500 text-white px-4 py-2 rounded-md btnHover"
                  >
                    {editedCategory ? "UPDATE" : "ADD"}
                  </button>
                </div>
              </form>
              <br />
              <div className="bg-gray-50 rounded-xl shadow-xl w-full max-w-4xl overflow-y-scroll h-96">
                {categories?.length > 0 &&
                  categories.map((data, index) => (
                    <div
                      key={index}
                      className="p-2 pt-2 bg-gray-200 rounded-md mb-4 flex justify-between items-center shadow-md"
                    >
                      <span className="text-xl">{data.categories}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditedCategory(data);
                            setCategory(data.categories);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md btnHover"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(data)}
                          type="submit"
                          className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md btnHover"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryPage;
