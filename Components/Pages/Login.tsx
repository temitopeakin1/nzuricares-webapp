"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../Custom/submitButton";

interface formData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    general?: string;
    email?: string;
    password?: string;
  }>({});
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Start loading
    if (!validateForm()) return;
    // take note here
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ general: error.message });
        return;
      } else {
        setFormData({
          email: "",
          password: "",
        });
        setSuccessMessage("Login Successful");
        setErrors({});
        // set timer for 5 seconds
        setTimeout(() => {
          router.push("/register");
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    }
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
          Login to register account
        </p>
      </div>
      {errors.general && (
        <p className="text-red-500 text-center mb-4 font-semibold">
          {errors.general}
        </p>
      )}
      {successMessage && (
        <div className="mt-4 text-center text-primary font-semibold">
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSignIn}
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
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <div className="flex relative">
            <input
              type={passwordVisibility ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute right-3 top-2.5"
              style={{ color: "#000000" }}
            >
              {passwordVisibility ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <button className="absolute -mt-2 right-8 text-red-800 font-satoshi ">
          Forgot password?
        </button>
        <SubmitButton
          className="w-full"
          text="Login"
          loadingText="Login"
          loading={loading}
        />
        <p className="mt-4 text-center text-gray-600">
          Don’t have an Account?{" "}
          <Link href="/signup" className="text-blue-700 font-semibold">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
