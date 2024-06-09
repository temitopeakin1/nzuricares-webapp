"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signup } from "@/app/data/actions/auth-actions";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { useFormState } from "react-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { SupabaseErrors } from "@/app/components/custom/SupabaseErrors";
import { ZodErrors } from "@/app/components/custom/ZodErrors";

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordVisibility, setPasswordVisiility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const supabase = createClientComponentClient();

  // variable to store the initial state
  const INITIAL_STATE = {
    data: null,
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handlePasswordVisibility = () => {
    setPasswordVisiility(!passwordVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const [formState, formAction] = useFormState(signup, INITIAL_STATE);
  console.log(formState);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    // take note of here
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        //emailRedirectTo: `${location.origin}/login`,
      },
    });

    if (error) {
      return "errors";
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccessMessage(
        "Signup successful! Please check your email to confirm your account."
      );
      // set timer for 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }
  };

  return (
    <div className="relative bg-white px-4 items-center py-12 my-8 rounded-lg shadow-lg w-[100%] max-w-md">
      <div className="flex flex-col items-center -mt-8">
        <Image src={"/images/logo.png"} alt={"logo"} width={150} height={150} />
        <MdOutlineCancel
          className="text-xl cursor-pointer absolute top-4 right-4"
          onClick={handleCancel}
        />
        {successMessage && (
          <div className="mt-4 text-center text-primary">{successMessage}</div>
        )}
        <h2 className="text-2xl font-semibold mt-4">Register Account</h2>
        <form className="max-w-2xl mt-8 px-4 py-8 border rounded-sm shadow-lg bg-gray-50">
          <div className="mb-4">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              placeholder="JohnDoe"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              required
            />
            <ZodErrors error={formState?.zodErrors?.username} />
          </div>
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <ZodErrors error={formState?.zodErrors?.email} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <div className="flex">
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <ZodErrors error={formState?.zodErrors?.password} />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                className="absolute ml-72 pl-4 mt-2.5"
                style={{ color: "#000000" }}
              >
                {passwordVisibility ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-semibold"
            >
              Confirm Password
            </label>
            <div className="flex">
              <input
                type={confirmPasswordVisibility ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <ZodErrors error={formState?.zodErrors?.confirmPassword} />
              <button
                type="button"
                onClick={handleConfirmPasswordVisibility}
                className="absolute ml-72 pl-4 mt-2.5"
                style={{ color: "#000000" }}
              >
                {passwordVisibility ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={handleSignUp}
            type="submit"
            className="w-full py-2 px-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
            {/* <SupabaseErrors error={formState?.supabaseErrors} /> */}
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-700 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
