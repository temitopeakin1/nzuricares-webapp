"use client";

import type React from "react";
import { type FormEvent, useState } from "react";
import { useSupabaseBrowser } from "@/lib/supabase-browser";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/Custom/submitButton";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    general?: string;
    email?: string;
    password?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const supabase = useSupabaseBrowser();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
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

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ general: error.message });
        return;
      }

      const user = data.user;
      if (!user) {
        setErrors({ general: "Login failed. Please try again." });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile || !profile.onboarding_completed) {
        router.push("/register-profile");
        return;
      }

      router.push("/");
    } catch (err) {
      setErrors({
        general: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white px-4 py-12 rounded-lg shadow-lg w-full max-w-md md:max-w-2xl my-8">
      <div className="flex flex-col items-center -mt-8">
        <Image src="/images/logo.png" alt="logo" width={150} height={150} />
        <p className="mt-2 font-serif">Welcome back,</p>
        <p className="mt-2 text-2xl font-semibold">Login to register profile</p>
      </div>

      {errors.general && (
        <p className="text-red-500 text-center my-4 font-semibold">
          {errors.general}
        </p>
      )}

      {successMessage && (
        <p className="text-green-600 text-center my-4 font-semibold">
          {successMessage}
        </p>
      )}

      <form
        onSubmit={handleSignIn}
        className="mt-8 px-4 py-8 border rounded-sm shadow-lg bg-gray-50"
      >
        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="name@example.com"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AiOutlineWarning className="mr-2" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative">
            <input
              type={passwordVisibility ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-4 text-black"
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

        {/* Forgot password */}
        <div className="text-right mb-4">
          <Link
            href="/forgotPassword"
            className="text-sm text-red-600 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton
          className="w-full"
          text="Login"
          loadingText="Logging in..."
          loading={loading}
        />

        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="text-blue-700 font-semibold">
            Click to Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
