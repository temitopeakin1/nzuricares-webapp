"use client";

import { Header } from "@/Components";
import FadeIn from "@/Components/UI/FadeIn";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/UI/Footer";
import Link from "next/link";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | string;
  message: string;
}

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);
  const [formType, setFormType] = useState<"individual" | "company">("individual"); // State to track selected form type
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof UserInfo
  ) => {
    setUserInfo({
      ...userInfo,
      [field]: e.target.value,
    });
  };

  const submitForm = async () => {
    const fullName = userInfo.firstName + " " + userInfo.lastName;
    const data = { fullName, formType, ...userInfo };
    console.log(data);
    setSubmitting(true);
    try {
      const res = await axios.post("/api/contact/routes", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 200 && res.statusText == "OK") {
        alert("Message sent successfully");
        setUserInfo({} as UserInfo);
      } else {
        alert("Something went wrong");
      }
      setSubmitting(false);
      return res.data;
    } catch (error) {
      console.error("Error occurred:", error);
      setSubmitting(false);
      throw error;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowUnderline(true);
    }, 500); // Adjust the delay as needed
  }, []);

  return (
    <div>
      <Header />
      <div
        className="w-full relative bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/nurse.jpg)",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-50">
          <FadeIn duration={4}>
            <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-tight mt-12 px-4 sm:px-8 md:px-16 lg:px-24 font-sans font-normal text-white relative">
              <span className="relative inline-block">
                Register
                {showUnderline && (
                  <span className="absolute left-0 bottom-0 h-2 bg-yellow-500 animate-underline"></span>
                )}
              </span>{" "}
              <span>your Interest</span>
            </h1>

            <div className="mt-4 px-4 sm:px-8 md:px-16 lg:px-24 text-white font-sans flex items-center">
              <MdEmail className="mr-2" />
              <Link href="mailto:info@nzurihealthcare.com" passHref>
                info@nzuricares.co.uk
              </Link>
              <div className="flex items-center ml-4">
                <FaPhone className="mr-2" />
                <a href={`tel:${userInfo.phoneNumber}`} className="text-white">
                  02080502662
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-full py-16">
        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-full ${
              formType === "individual"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setFormType("individual")}
          >
            Individual
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              formType === "company"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setFormType("company")}
          >
            Company
          </button>
        </div>

        {/* Form Container */}
        <div className="w-full md:w-[80%] px-4 md:px-0 mt-8 relative">
          <div className="p-6 md:p-12 w-full bg-white rounded-md shadow-md">
            <h2 className="text-[20px] md:text-[36px] text-center font-bold text-primary">
              {formType === "individual"
                ? "Register your interest as an Individual"
                : "Register your interest as a Company"}
            </h2>
            <p className="text-12 text-justify mb-8">
              {formType === "individual"
                ? "We’re here to support individuals in achieving their healthcare career goals."
                : "For companies seeking to hire healthcare staff, we’re ready to help you find the best talent."}
            </p>
            <div className="w-full">
              {/* Form Fields */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {formType === "individual" ? "First Name" : "Company Name"}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder={
                    formType === "individual" ? "First Name" : "Company Name"
                  }
                  value={userInfo.firstName}
                  onChange={(e) => handleFormChange(e, "firstName")}
                />
              </div>
              {/* Additional fields */}
              {formType === "individual" && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Last Name"
                    value={userInfo.lastName}
                    onChange={(e) => handleFormChange(e, "lastName")}
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="you@company.com"
                  value={userInfo.email}
                  onChange={(e) => handleFormChange(e, "email")}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="tel"
                  placeholder="+44 20 0000 0000"
                  value={userInfo.phoneNumber}
                  onChange={(e) => handleFormChange(e, "phoneNumber")}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Leave us a message..."
                  rows={5}
                  value={userInfo.message}
                  onChange={(e) => handleFormChange(e, "message")}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={submitForm}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
