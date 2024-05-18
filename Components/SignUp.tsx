"use client";

import Link from "next/link";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";

interface formData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpProps {
  onSignUpSuccess: (isSuccess: boolean) => void;
  onCancel: () => void; // Add onCancel prop
}

const Signup: React.FC<SignUpProps> = ({ onSignUpSuccess, onCancel }) => {
  const [formData, setFormData] = useState<formData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // state variables
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSignedUp, setIsSignedUp] = useState(false);

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
      setIsSignedUp(true);
      onSignUpSuccess(true);
    }

    setErrors(newErrors);
  };

  if (isSignedUp) {
    return (
      <div className="px-4 items-center py-8 rounded-lg bg-white">
        <p className="mt-4 text-center text-gray-600">
          Your signup was successful. Please{" "}
          <Link href="/login" className="text-blue-700">
            Login
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white my-16 items-center rounded-lg shadow-lg w-[100%] max-w-md">
        <div className="flex flex-col items-center mt-2">
          <Image 
            src={"/images/logo.png"}
            alt={"logo"}
            width={150}
            height={150}
            className="items-center"
          />
          <MdOutlineCancel
            className="text-xl cursor-pointer absolute top-4 right-4"
            onClick={onCancel}
          />
          <div className="text-left text-2xl font-semibold">Register Account</div>
          <form
            onSubmit={handleSubmit}
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
    </div>
  );
};

export default Signup;
