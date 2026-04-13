"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/app/supabaseClient";
import { MotionSection } from "@/components/motion/MotionSection";

interface Formdata {
  email: string;
}

const Subscribe = () => {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<Formdata>({
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // time out after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // Cleanup the timer if the component unmounts or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
  
    try {
      console.log("Submitting email:", formData.email);
  
      const { data: insertData, error: insertError } = await supabase
        .from("subscription")
        .insert([{ email: formData.email }]);
  
      console.log("insertData:", insertData);
      console.log("insertError:", insertError);
  
      if (insertError) throw insertError;
  
      setSuccessMessage("Thank you for subscribing!");
      setFormData({ email: "" }); // Clear the form
    } catch (error) {
      console.error("Error during subscription:", error);
      setErrors({
        general: "Email subscribed already",
      });
    }
  };
  

  return (
    <MotionSection className="mx-auto my-16 flex w-full max-w-screen-md flex-col items-center space-y-8 rounded-lg border-b-8 border-secondary bg-primary px-4 py-8 md:w-[80%] md:px-8 md:py-8 lg:w-[75%]">
      {successMessage && (
        <p className="text-center font-body font-normal text-white">
          {successMessage}
        </p>
      )}
      {errors.general && (
        <p className="text-center text-white">{errors.general}</p>
      )}
      <motion.div
        className="w-full text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: reduceMotion ? 0 : 0.08,
        }}
      >
        <div className="py-4 font-sans text-2xl font-normal text-white">
          Subscribe to receive updates
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-wrap items-center justify-center rounded-sm border bg-white px-2 py-2 sm:flex-nowrap"
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@domain.com"
            onChange={handleChange}
            value={formData.email}
            className="flex-grow rounded-md border px-3 py-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <button
            type="submit"
            className="ml-2 rounded-md bg-gradient-to-r from-blue-900 to-yellow-700 px-8 py-2 font-normal text-white transition duration-300 hover:bg-red-400"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </MotionSection>
  );
};

export default Subscribe;
