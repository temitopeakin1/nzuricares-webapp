"use client";

import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../Custom/submitButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";

interface FormData {
  email: string;
  password: string;
}

const UpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [errors, setErrors] = useState<{
    general?: string;
    email?: string;
    password?: string;
  }>({});

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleCancel = () => {
    router.push("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setErrors({ general: error.message });
        return;
      }

      setSuccessMessage("Successfully Reset Password");
      setErrors({});
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white px-4 py-12 items-center rounded-lg shadow-lg w-[100%] max-w-md my-8">
      <div className="flex flex-col items-center -mt-8">
        <Image src="/images/logo.png" alt="logo" width={150} height={150} />
        <MdOutlineCancel
          className="text-xl cursor-pointer absolute top-4 right-4"
          onClick={handleCancel}
        />
        <p className="mt-2 text-2xl font-body font-semibold">Update Password</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mt-8 px-4 py-8 border rounded-sm shadow-lg bg-gray-50"
      >
        {successMessage && (
          <p className="text-center justify-center text-blue-500">
            {successMessage}
          </p>
        )}

        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Input your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              <AiOutlineWarning className="mr-2" />
              {errors.email}
            </p>
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
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AiOutlineWarning className="mr-2" />
              {errors.password}
            </p>
          )}
        </div>
        <SubmitButton
          className="w-full"
          text="Submit"
          loadingText="Submitting..."
          loading={loading}
        />
      </form>
    </div>
  );
};

export default UpdateUser;
