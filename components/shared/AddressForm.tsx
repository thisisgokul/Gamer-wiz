import React from "react";
import { ProfileFormProps } from "@/types";

const AddressForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  onChange,
  userData,
  loading,
  sessionUserData,
}) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex-grow max-w-4xl p-8 bg-gray-50 border-[1px] border-yellowGlight rounded-xl shadow-xl"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Full Name
          </label>
          <input
          defaultValue={userData?.name}

            placeholder="Full Name"
            type="text"
            id="name"
            className="inputs"
            onChange={onChange}
          />
        </div>
        <div  className="flex justify-between gap-2 w-full">
        <div className="mb-2 w-1/2">
          <label className="block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            defaultValue={sessionUserData?.email!}
            disabled={true}
            placeholder="Email"
            type="email"
            id="email"
            className="inputs bg-gray-400"
          />
        </div>
        <div className="mb-2 w-1/2">
          <label className="block text-sm font-medium text-gray-800">
            Phone
          </label>
          <input
            defaultValue={userData.phone}
            placeholder=""
            type="number"
            id="phone"
            className="inputs"
            onChange={onChange}
          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            address
          </label>
          <input
            defaultValue={userData.address}
            placeholder=""
            type="text"
            id="address"
            className="inputs"
            onChange={onChange}
          />
        </div>
        <div className="flex justify-between gap-2 w-full">
        <div className="w-1/2">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-800">
            Postal Code
          </label>
          <input
            defaultValue={userData.postalCode}
            placeholder=""
            type="number"
            id="postalCode"
            className="inputs"
            onChange={onChange}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-800">
            City
          </label>
          <input
            defaultValue={userData.city}
            placeholder=""
            type="text"
            id="city"
            className="inputs"
            onChange={onChange}
          />
        </div>
      </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            country
          </label>
          <input
            defaultValue={userData.country}
            placeholder="country"
            type="text"
            id="country"
            className="inputs"
            onChange={onChange}
          />
        </div>
        <button
          className="flex justify-center gap-4 w-full bg-secondary py-2 rounded-full text-primary"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </>
  );
};

export default AddressForm;
