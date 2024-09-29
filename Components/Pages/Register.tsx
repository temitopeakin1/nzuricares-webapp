"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../Custom/submitButton";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import SuccessModal from "../successModal";

interface FormData {
  profileId: string;
  // created_at: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  jobType: string;
  postCode: string;
  resume: File | null;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    profileId: "",
    // created_at: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    jobType: "",
    postCode: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePhoneNumberChange = (value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value || "",
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Home address is required";
    }
    if (!formData.jobType.trim()) {
      newErrors.jobType = "Job type is required";
    }
    if (!formData.postCode.trim()) {
      newErrors.postCode = "Post code is required";
    }
    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("register")
    event.preventDefault();
    if (!validateForm()) return;
    const profileId = `NZ${Math.floor(Math.random() * 1000)}`;

    setLoading(true); 
    

    try {
      const resumeFileName = `${Date.now()}_${
        formData.resume?.name || "resume"
      }`;
      const { data: resumeData, error: resumeError } = await supabase.storage
        .from("resumes")
        .upload(resumeFileName, formData.resume as File);

      if (resumeError) {
        setErrors({ general: "Failed to upload resume. Please try again." });
        setLoading(false);
        return;
      }

      const resumePath = resumeData?.path ?? null;

      // fetch data from the profileData table
      const { data: insertData, error: insertError } = await supabase
        .from("profileData")
        .insert([
          {
            profileId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            jobType: formData.jobType,
            postCode: formData.postCode,
            resume: resumePath,
          },
        ]);

      console.log("insertData:", insertData);
      console.log("insertError:", insertError);
      setFormData({
        profileId: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        jobType: "",
        postCode: "",
        resume: null,
      });

      setErrors({});
     setIsModalVisible(true);
    } catch (error) {
      console.error("Error:", error);
      setErrors({
        general: "Error occurred while registering. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white px-4 items-center py-12 rounded-lg shadow-lg w-[100%] max-w-xl my-8">
      <div className="flex flex-col items-center -mt-8">
        <Image
          src={"/images/logo.png"}
          alt={"logo"}
          width={150}
          height={150}
          className="items-center"
        />
        <h2 className="mt-0.5 text-2xl font-body font-semibold">
          Register Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mt-8 px-4 py-8 border rounded-sm shadow-lg bg-gray-50"
        >
          {/* {successMessage && (
            <p className="-mt-16 text-center justify-center text-primary">
              {successMessage}
            </p>
          )} */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="font-semibold">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                placeholder="John"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
                required
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="font-semibold">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                placeholder="Doe"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
                required
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName}</p>
              )}
            </div>
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
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold">
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="GB"
              countryCallingCodeEditable={false}
              value={formData.phoneNumber}
              onChange={handlePhoneNumberChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              inputClassName="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="postCode" className="font-semibold">
              Post Code
            </label>
            <input
              type="text"
              id="postCode"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              required
            />
            {errors.postCode && (
              <p className="text-red-500">{errors.postCode}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="font-semibold">
              Home Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              required
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="jobType" className="font-semibold">
              Job Type
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 bg-white"
              required
            >
              <option value="" disabled>
                Select a job type
              </option>
              <option value="cleaners">Cleaners</option>
              <option value="carers">Carers</option>
              <option value="nurses">Nurses</option>
              <option value="support workers">Support Workers</option>
            </select>
            {errors.jobType && <p className="text-red-500">{errors.jobType}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="resume" className="font-semibold">
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              required
            />
            {errors.resume && <p className="text-red-500">{errors.resume}</p>}
          </div>
          {errors.submit && <p className="text-red-500">{errors.submit}</p>}
          <SubmitButton
            className="w-full"
            text="Register"
            loadingText="Registering.."
            loading={loading}
          />
        </form>
      </div>
      {/*success modal */}
      {isModalVisible && (
        <SuccessModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      )}
    </div>
  );
};

export default Register;
