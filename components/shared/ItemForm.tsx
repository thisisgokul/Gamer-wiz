import { Category, AddItems } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ItemForm: React.FC<AddItems> = ({
  onclick,id,onsubmit,setCategory,itemname,setItemname,
  description,setDescription,price,setPrice,category,
  loading,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory();
    fetchCategoryById();
  }, []);

  function fetchCategory() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }
  function fetchCategoryById() {
    if (!id) {
      return;
    }
    axios.post("/api/add-items/single-data", { _id: id }).then((res) => {
      const data = res.data;
      setItemname(data.name);
      setCategory(data.category);
      setDescription(data.description);
      setPrice(data.price);
      console.log("fetchedById", data);
    });
  }

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex-grow max-w-3xl p-8 bg-gray-50 rounded-xl shadow-xl"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Item Name
          </label>
          <input
            value={itemname}
            onChange={(e) => setItemname(e.target.value)}
            placeholder="Item Name"
            type="text"
            id="itemname"
            className="inputs"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Categories
          </label>
          <select
            value={category}
            className="inputs"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Choose category</option>
            {categories.map((item) => (
              <option key={item._id} value={item.categories}>
                {item.categories}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            id="description"
            className="inputs"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            id="price"
            className="inputs"
          />
        </div>
        <div className="flex justify-center gap-4 w-full py-2 rounded-full text-primary ">
          <button
            className=" bg-gray-800 py-2 rounded-2xl shadow-lg btnHover w-full"
            type="submit"
           disabled={loading}
          >
            {id ? "update" : "Submit"}
          </button>
          {id && (
            <button
              type="button"
              onClick={onclick}
              className=" py-2 rounded-2xl shadow-lg btnHover bg-red-500 w-full"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ItemForm;
