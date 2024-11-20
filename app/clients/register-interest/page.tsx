"use client";

import { Header } from "@/Components";
import FadeIn from "@/Components/UI/FadeIn";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/UI/Footer";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface FormData {
  firstName: string;
  lastName: string;
  companyRepresentativeName: string;
  companyName: string;
  healthNumber: number;
  category: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formType, setFormType] = useState<"individual" | "company">(
    "individual"
  );
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyRepresentativeName: "",
    companyName: "",
    healthNumber: 0,
    category: "",
    phoneNumber: "",
    message: "",
  });
  //   const [isSubmitting, setSubmitting] = useState(false);

  const handlePhoneNumberChange = (value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value || "",
    }));
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof FormData
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // validate logic
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    }
    if (formType === "individual") {
      if (!formData.firstName) newErrors.firstName = "First name is required.";
      if (!formData.lastName) newErrors.lastName = "Last name is required.";
    } else if (formType === "company") {
      if (!formData.companyRepresentativeName) {
        newErrors.companyRepresentativeName =
          "Representative name is required.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit form logic
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;
    const fullName =
      formType === "individual"
        ? `${formData.firstName} ${formData.lastName}`
        : `${formData.companyName} ${formData.companyRepresentativeName}`;
    const data = { fullName, ...formData };
    console.log(data);
  };

  // for the underline animation on text on bgImage
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
                <a href={`tel:${formData.phoneNumber}`} className="text-white">
                  02080502662
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div>
      </div>
      <div className="py-8 md:py-16 flex flex-col items-center justify-center w-full">
        {/* toggle button */}
        <div className="w-full md:w-[80%] px-4 md:px-0 mt-8 relative">
          <div className="w-full flex flex-col md:flex-row-reverse items-center justify-center">
            {/* Form Container */}
            <div className="p-6 md:p-12 w-full md:w-[90%] mb-[1em] md:mb-[4em] bg-white rounded-md shadow-md items-center justify-center">
              <h2 className="text-[20px] md:text-[36px] text-center -mt-16 -md:mt-8 font-bold text-primary">
                Register your interest today
              </h2>
              <p className="text-12 text-justify md:text-center ">
                Register your interest below and one of our dedicated
                consultants will be in touch with you.
              </p>
              {/* toggle options between individual and company */}
              <div className="flex space-x-4 my-8 items-center justify-center">
                <button
                  className={`px-4 py-2 rounded-full ${
                    formType === "individual"
                      ? "bg-blue-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setFormType("individual")}
                >
                  Individual
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    formType === "company"
                      ? "bg-blue-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setFormType("company")}
                >
                  Company
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="w-full mt-8">
                  <div className="flex flex-col md:flex-row items-center gap-x-6">
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        {formType === "individual"
                          ? "First Name"
                          : "Company Name"}
                      </label>
                      <input
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                        type="text"
                        placeholder={
                          formType === "individual"
                            ? "First Name"
                            : "Company Name"
                        }
                        value={formData.firstName}
                        onChange={(e) => handleFormChange(e, "firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        {formType === "individual"
                          ? "Last Name"
                          : "Company Representative Name"}
                      </label>
                      <input
                        className=" border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                        type="text"
                        placeholder={
                          formType === "individual"
                            ? "Last Name"
                            : "Company Rep. Name"
                        }
                        value={formData.lastName}
                        onChange={(e) => handleFormChange(e, "firstName")}
                      />
                    </div>
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email / Company email
                    </label>
                    <input
                      className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      id="lastname"
                      type="text"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => handleFormChange(e, "email")}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phone Number
                    </label>
                    <PhoneInput
                      international
                      defaultCountry="GB"
                      countryCallingCodeEditable={false}
                      value={formData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      required
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-x-6 w-full">
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        No of professionals needed (optional)
                      </label>
                      <input
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                        type="text"
                        placeholder="Number needed"
                        value={formData.healthNumber}
                        onChange={(e) => handleFormChange(e, "healthNumber")}
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Healthcare Category
                      </label>
                      <select
                        id="jobType"
                        name="jobType"
                        value={formData.category}
                        onChange={(e) => handleFormChange(e, "category")}
                        className="border rounded-md w-full px-3 py-2 focus:outline-none bg-white "
                        required
                      >
                        <option value="" disabled>
                          Select a Healthcare category
                        </option>
                        <option value="Registered Nurse">
                          Registered Nurse
                        </option>
                        <option value="carers">Carer</option>
                        <option value="support workers">Support Worker</option>
                        <option value="cleaners">Cleaners</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Message
                    </label>
                    <textarea
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      id="message"
                      placeholder="Leave us a message..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleFormChange(e, "message")}
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      // disabled={isSubmitting}
                      className="mt-2 px-[2em] py-[.5em] mx-1 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
