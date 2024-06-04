"use client";

import React, { useState } from "react";

const Subscribe = () => {
  const [formData, setFormData] = useState({ email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit", formData);
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-primary border-secondary my-16 border-b-8 w-full px-4 py-8 md:px-8 md:py-8 md:w-[80%] lg:w-[75%] flex flex-col md:flex-row items-center max-w-screen-md mx-auto rounded-lg ">
      <div className="md:flex-row sm:flex-row items-center justify-between py-4 space-y-8 sm:space-y-0 md:space-y-0 w-full">
        <div className="text-white text-center justify-center text-2xl py-4 font-sans font-normal">
          Subscribe to receive real-time updates
        </div>
        <form
          onSubmit={handleSubmit}
        className="flex flex-wrap sm:flex-nowrap items-center justify-end w-full sm:w-auto px-2 py-2 border rounded-sm bg-white"
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@domain.com"
            onChange={handleChange}
            value={formData.email}
            className="flex-grow px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="ml-2 py-2 px-8 bg-gradient-to-r from-blue-900 to-yellow-700 hover:bg-red-400 text-white font-normal rounded-md transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
