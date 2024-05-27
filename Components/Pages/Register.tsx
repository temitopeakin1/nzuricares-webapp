"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";

interface formData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  jobType: string;
  postCode: string;
  resume: string;
}

const Register = () => {
  const [formData, setFormData] = useState<formData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    jobType: "",
    postCode: "",
    resume: "",
  });

  //declare state variables
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // handle change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};
    //setErrors(null) // clear previous error when a new request starts 

    if (!formData.firstName) {
      newErrors.firstName = "firstName is required";
    }

    if (!formData.firstName) {
      newErrors.lastName = "lastName is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    }

    if (!formData.homeAddress) {
      newErrors.homeAddress = "Home Address is required";
    }

    if (!formData.jobType) {
      newErrors.homeAddress = "Home Address is required";
    }
    if (!formData.postCode) {
      newErrors.postCode = "Post Code is required";
    }
    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    }

    if (Object.keys(newErrors).length === 0) {
      window.location.href = "/register";
    }

    setErrors(newErrors);
  };

  return (
    <div className="relative bg-white px-4 items-center py-12 rounded-lg shadow-lg w-[100%] max-w-md">
      <div className="flex flex-col items-center -mt-8">
        <Image
          src={"/images/logo.png"}
          alt={"logo"}
          width={150}
          height={150}
          className="items-center"
        />
        <p className="mt-.5 text-2xl font-body font-semibold">
          Register profile
        </p>
      </div>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default Register;
