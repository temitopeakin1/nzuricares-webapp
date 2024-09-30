"use client";

import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../Custom/submitButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AiOutlineWarning } from "react-icons/ai";

interface formData {
  email: string;
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<formData>({email: ""})

  const [errors, setErrors] = useState<{
    general?: string;
    email?: string;
  }>({});

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email
      );
      if (error) {
        setErrors({ general: error.message });
        return;
      }

      setSuccessMessage("Password recovery email sent!");
      setErrors({});
      setTimeout(() => {
        router.push("/updateuser");
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
        <p className="mt-2 text-2xl font-body font-semibold">
          Recover your password
        </p>
        <p className="mt-2 text-sm font-body">
          You&apos;ll receive an email to recover your password
        </p>
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

export default ForgotPassword;
