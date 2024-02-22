import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBlack padding-x">
      <div className="max-w-md w-full bg-metalicblack p-8 shadow-md rounded-md text-gray-50">
        <h2 className="text-4xl font-bold text-yellowGreen mb-8">Contact Us</h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <p className="text-gray-200">123 Main Street</p>
          <p className="text-gray-200">City, State ZIP</p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <p className="text-gray-200">123-456-7890</p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-gray-200">gamerWiz@example.com</p>
        </div>
        <div className="flex justify-center">
          <p className="text-green-400 font-semibold text-lg">Happy Gaming</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
