"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signup } from "@/app/data/actions/auth-actions";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { useFormState } from "react-dom";
import { ZodErrors } from "@/app/components/custom/ZodErrors";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";



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
  const [passwordVisibility, setPasswordVisiility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

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
    setConfirmPasswordVisibility(!confirmPasswordVisibility)
  }

  const [formState, formAction] = useFormState(
    signup,
    INITIAL_STATE
  );
  console.log(formState);
  //const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const newErrors: { [key: string]: string } = {};

    // if (!formData.username.trim()) {
    //   newErrors.username = "Username is required";
    // }

    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    //   newErrors.email = "Invalid email format";
    // }

    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    // }

    // if (formData.password !== formData.confirmPassword) {
    //   newErrors.confirmPassword = "Passwords do not match";
    // }

    if (Object.keys(ZodErrors).length === 0) {
      // Call the registerUserAction or any API call here
      router.push("/login");
    }

    //setErrors(errors);
  };

  return (
    <div className="relative bg-white px-4 items-center py-12 my-8 rounded-lg shadow-lg w-[100%] max-w-md">
      <div className="flex flex-col items-center -mt-8">
        <Image src={"/images/logo.png"} alt={"logo"} width={150} height={150} />
        <MdOutlineCancel
          className="text-xl cursor-pointer absolute top-4 right-4"
          onClick={handleCancel}
        />
        <h2 className="text-2xl font-semibold mt-4">Register Account</h2>
        <form
          action={formAction}
          className="max-w-2xl mt-8 px-4 py-8 border rounded-sm shadow-lg bg-gray-50"
        >
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
            <ZodErrors error={formState?.zodErrors?.password} />
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
            <ZodErrors error={formState?.zodErrors?.confirmPassword} />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
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