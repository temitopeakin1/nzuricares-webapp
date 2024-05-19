"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { registerUserAction } from "@/app/data/actions/auth-actions";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { useFormState } from "react-dom";

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

  // variable to store the initial state
  const INITIAL_STATE = {
    data: null,
  }; 

  const handleCancel = () => {
    router.push("/");
  };

  const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
  console.log(formState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      // Call the registerUserAction or any API call here
      router.push("/login");
    }

    setErrors(newErrors);
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
              className="w-full px-8 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username}</p>
            )}
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword}
              </p>
            )}
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
