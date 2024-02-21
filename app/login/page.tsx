"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Google from "@/public/Google2.png";
import { signIn } from "next-auth/react";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    await signIn('credentials',{email,password,callbackUrl:'/'})
    setLoading(false)

  };

 

  return (
    <div className="padding bg-gray-100">
      <h1 className="text-center font-semibold text-coral-blue text-4xl mb-8">
        Login
      </h1>

      <form
        className="max-w-md mx-auto p-8 bg-gray-50 rounded-xl shadow-xl"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            type="email"
            id="email"
            className="inputs"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
          
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
            type="password"
            id="password"
            className='inputs'
          />
          {/* {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )} */}
        </div>

        <button
          type="submit"
          className="btnHover w-full py-2 mt-4 bg-coral-blue
           text-white rounded-md hover:bg-coral-dark-blue focus:outline-none 
           focus:ring focus:border-coral-blue"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Login"}
        </button>

        <p className="text-center py-2 text-md text-gray-500">
          or Login with Provider
        </p>

        <button
        type="button"
        onClick={()=>signIn('google',{callbackUrl:'/'})}
          className="flex justify-center gap-4 w-full bg-gray-800 py-2 rounded-full text-primary"
          disabled={loading}
        >
          <Image  src={ Google} alt="google logo" width={24} height={24} />
          Login With Google
        </button>
      </form>
    </div>
  );
};

export default Loginpage;
