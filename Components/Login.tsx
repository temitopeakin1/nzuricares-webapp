"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface formData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });

  // state variables
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // handle change method
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle submit method
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("Form Submitted:" , formData )
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Enail is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length === 0) {
      window.location.href = "/register";
    }

    setErrors(newErrors);
  };

  return (
    <div className="relative bg-white px-4 items-center py-12 rounded-lg shadow-lg w-[100%] max-w-md">
      <div className="flex flex-col items-center -mt-8">
        <Image
          src={"/images/logo.png"}
          alt={"logo"}
          width={150}
          height={150}
          className="items-center"
        />
        <p className="mt-2 font-serif font-normal">Welcome back,</p>
        <p className="mt-2 text-2xl font-body font-semibold">
          Login to your Account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mt-8 px-4 py-8 border rounded-sm shadow-lg bg-gray-50"
      >
        <div className="mb-4">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="name@example.com"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <button className="absolute -mt-2 right-8 text-red-800 font-satoshi ">
          Forgot password?
        </button>
        <button
          type="submit"
          className="w-full mt-8 py-2 px-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an Account?{" "}
          <Link href="/" className="text-blue-700 font-semibold">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
