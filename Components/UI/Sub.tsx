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
    <div className="bg-primary border-secondary my-16 border-b-8 w-full px-4 py-8 md:px-8 md:py-8 lg:w-[80%] xl:w-[75%] flex flex-col md:flex-row items-center max-w-screen-lg mx-auto rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
        <div className="text-white text-center md:text-left text-2xl font-sans font-normal">
          Subscribe to receive real-time updates
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center w-full sm:w-auto bg-gray-50 p-4 rounded-md shadow-md"
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@domain.com"
            onChange={handleChange}
            value={formData.email}
            className="flex-grow w-full sm:w-auto px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="mt-2 sm:mt-0 sm:ml-2 py-2 px-4 bg-gradient-to-r from-blue-900 to-yellow-700 hover:bg-red-400 text-white font-normal rounded-md transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
