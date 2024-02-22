"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Google from "@/public/Google2.png";
import axios from "axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("User has been created");
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  return (
    <div className="padding bg-gray-100">
      <h1 className="text-center font-semibold text-coral-blue text-4xl mb-8">
        Register
      </h1>

      <form
        className="max-w-md mx-auto p-8 bg-gray-50 rounded-xl shadow-xl"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="fullname"
            type="text"
            id="name"
            className="inputs"
          />
        </div>
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
            className={`inputs ${passwordError ? "border-red-500" : ""}`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="btnHover w-full py-2 mt-4 bg-coral-blue
           text-white rounded-md hover:bg-coral-dark-blue focus:outline-none 
           focus:ring focus:border-coral-blue"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center py-2 text-md text-gray-500">
          or Login with Provider
        </p>

        <button
          type="submit"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex justify-center gap-4 w-full bg-gray-800 py-2 rounded-full text-primary"
          disabled={loading}
        >
          <Image src={Google} alt="google logo" width={24} height={24} />
          Login With Google
        </button>
        
        <p className="text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-coral-blue font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
