"use client";


import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../Custom/submitButton";
import { MdOutlineCancel } from "react-icons/md";

interface formData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<formData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    general?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleCancel = () => {
    router.push("/");
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setErrors({ general: error.message });
      } else {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setSuccessMessage("Signup successful! Please check your email to confirm your account.");
        setErrors({});
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white px-4 items-center py-12 rounded-lg shadow-lg w-[100%] max-w-md my-8">
      <div className="flex flex-col items-center -mt-8">
        <Image
          src={"/images/logo.png"}
          alt={"logo"}
          width={150}
          height={150}
        />
        <MdOutlineCancel
          className="text-xl cursor-pointer absolute top-4 right-4"
          onClick={handleCancel}
        />
        <p className="mt-2 text-2xl font-body font-semibold">Sign Up</p>
      </div>
      {errors.general && (
        <p className="text-red-500 text-center mb-4 font-semibold">{errors.general}</p>
      )}
      {successMessage && (
        <div className="mt-4 text-center text-primary font-semibold">{successMessage}</div>
      )}
      <form onSubmit={handleSignUp} className="max-w-2xl mt-8 px-4 py-8 border rounded-sm shadow-lg bg-gray-50">
        <div className="mb-4">
          <label htmlFor="username" className="font-semibold">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            placeholder="John Doe"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AiOutlineWarning className="mr-2" />
              {errors.username}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="font-semibold">Email</label>
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
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AiOutlineWarning className="mr-2" />
              {errors.email}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
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
              {passwordVisibility ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AiOutlineWarning className="mr-2" />
              {errors.password}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 font-semibold">Confirm Password</label>
          <div className="flex relative">
            <input
              type={confirmPasswordVisibility ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleConfirmPasswordVisibility}
              className="absolute right-3 top-2.5"
              style={{ color: "#000000" }}
            >
              {confirmPasswordVisibility ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AiOutlineWarning className="mr-2" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <SubmitButton
          className="w-full"
          text="Signup"
          loadingText="Signing up..."
          loading={loading}
        />
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
