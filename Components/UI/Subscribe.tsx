"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/app/supabaseClient";

interface Formdata {
  email: string;
}

const Subscribe = () => {
  const [formData, setFormData] = useState<Formdata>({ email: "" });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // 3 seconds

      // Cleanup the timer if the component unmounts or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const { data: insertData, error: insertError } = await supabase
        .from("subscriptions") // Your table name
        .insert([{ email: formData.email }]);

      if (insertError) {
        throw insertError;
      }

      setSuccessMessage("Thank you for subscribing!");
      setErrors({});
      setFormData({ email: "" }); // Clear the form
    } catch (error) {
      setErrors({
        general: "Error occurred while subscribing",
      });
    }
  };

  return (
    <div className="bg-primary border-secondary my-16 border-b-8 w-full px-4 py-8 md:px-8 md:py-8 md:w-[80%] lg:w-[75%] flex flex-col items-center max-w-screen-md mx-auto rounded-lg space-y-8">
      {successMessage && (
        <p className="text-white text-center font-normal font-body w-full">
          {successMessage}
        </p>
      )}
      <div className="w-full text-center">
        <div className="text-white text-2xl py-4 font-sans font-normal">
          Subscribe to receive real-time updates
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap sm:flex-nowrap items-center justify-center w-full px-2 py-2 border rounded-sm bg-white"
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@domain.com"
            onChange={handleChange}
            value={formData.email}
            className="flex-grow px-3 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="ml-2 py-2 px-8 bg-gradient-to-r from-blue-900 to-yellow-700 hover:bg-red-400 text-white font-normal rounded-md transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
      {errors.general && (
        <p className="text-white text-center mt-4 w-full">{errors.general}</p>
      )}
    </div>
  );
};

export default Subscribe;
