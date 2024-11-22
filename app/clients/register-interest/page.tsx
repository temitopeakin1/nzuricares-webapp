"use client";

import { Header } from "@/Components";
import FadeIn from "@/Components/UI/FadeIn";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/UI/Footer";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface FormData {
  firstName: string;
  lastName: string;
  companyRepresentativeName: string;
  companyName: string;
  noProfessionals: number;
  jd: string;
  category: string;
  email: string;
  phoneNumber: string;
  message: string;
  startDate: string;
  endDate: string;
  country: string;
  city: string;
  postalCode: string;
}

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isChecked, setIsChecked] = useState(false);
  const [formType, setFormType] = useState<"individual" | "company">(
    "individual"
  );
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyRepresentativeName: "",
    companyName: "",
    noProfessionals: 0,
    jd: "",
    category: "",
    phoneNumber: "",
    message: "",
    startDate: "",
    endDate: "",
    country: "",
    city: "",
    postalCode: "",
  });
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    // Fetch countries using a public API or predefined list
    const fetchCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryOptions = response.data.map((country: any) => ({
        label: country.name.common,
        value: country.cca2,
      }));
      setCountries(countryOptions);
    };
    fetchCountries();
  }, []);

  // Fetch cities based on the selected country
  const fetchCities = async (countryCode: string) => {
    if (countryCode) {
      try {
        const res = await axios.get(
          `https://api.geonames.org/searchJSON?formatted=true&country=${countryCode}&username=nzurihealthcare&style=full`
        );

        if (res.data.geonames) {
          const cityOptions = res.data.geonames.map((city: any) => ({
            label: city.name,
            value: city.name,
            postalCode: city.postalCode,
          }));
          setCities(cityOptions);
        } else {
          console.error("No cities found for the given country code.");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
  };

  // logic to handle country
  const handleCountryChange = (selectedOption: any) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption ? selectedOption.value : "",
      city: "",
      postalCode: "",
    }));
    fetchCities(selectedOption.value);
  };

  const handleCityChange = (selectedOption: any) => {
    setFormData((prevData) => ({
      ...prevData,
      city: selectedOption ? selectedOption.value : "",
      postalCode: selectedOption ? selectedOption.postalCode : "",
    }));
  };

  // Handle phone number change
  const handlePhoneNumberChange = (value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value || "",
    }));
  };

  // Handle form field change
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

  // Validate form logic
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
      if (!formData.country) newErrors.country = "Country is required.";
      if (!formData.city) newErrors.city = "City is required.";
      if (!formData.postalCode)
        newErrors.postalCode = "Postal code is required.";
    }

    // date validation : start and end
    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.date = "End date must be after the start date.";
    }
    // for the checkbox
    if (!isChecked) {
      // Validate if checkbox is checked
      newErrors.checkbox = "kindly tick the checkbox to agree consent to the terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle date change
  const handleDateChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "startDate" | "endDate"
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // handle checkbox change
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  // Handle form submission
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

  // Underline animation on text background image
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
              <p className="text-14 text-justify md:text-center ">
                Register your interest below and our team will be in touch with
                you.
              </p>
              {/* toggle options between individual and company */}
              <div className="flex space-x-4 mt-4 mb-16 items-center justify-center">
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
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                        type="text"
                        placeholder={
                          formType === "individual"
                            ? "Last Name"
                            : "Company Rep. Name"
                        }
                        value={
                          formType === "individual"
                            ? formData.lastName
                            : formData.companyRepresentativeName
                        }
                        onChange={(e) =>
                          handleFormChange(
                            e,
                            formType === "individual"
                              ? "lastName"
                              : "companyRepresentativeName"
                          )
                        }
                      />
                      {errors.lastName && (
                        <p className="text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email / Company email
                    </label>
                    <input
                      className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      type="email"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => handleFormChange(e, "email")}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-x-6 w-full">
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
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Country
                      </label>
                      <Select
                        options={countries}
                        onChange={handleCountryChange}
                        value={countries.find(
                          (country) => country.value === formData.country
                        )}
                      />
                      {errors.country && (
                        <p className="text-red-500">{errors.country}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-x-6 w-full">
                    {/* <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        City
                      </label>
                      <Select
                        options={cities}
                        onChange={handleCityChange}
                        value={cities.find(
                          (city) => city.value === formData.city
                        )}
                      />
                      {errors.city && (
                        <p className="text-red-500">{errors.city}</p>
                      )}
                    </div> */}
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        City
                      </label>
                      <input className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      type="city" 
                      placeholder="city"
                      value={formData.city}
                      onChange={(e) => handleFormChange(e, "city")}/>
                       {errors.city && (
                        <p className="text-red-500">{errors.city}</p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleFormChange(e, "postalCode")}
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                        
                      />
                      {errors.postalCode && (
                        <p className="text-red-500">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-x-6 w-full">
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        No of Health Professionals needed
                      </label>
                      <input
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                        type="text"
                        placeholder="Number of professionals needed"
                        value={formData.noProfessionals}
                        onChange={(e) => handleFormChange(e, "noProfessionals")}
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
                          Select a Healthcare professional type
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
                  {/* Start Date */}
                  <div className="flex flex-col md:flex-row items-center gap-x-6 w-full">
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleDateChange(e, "startDate")}
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      />
                      {errors.startDate && (
                        <p className="text-red-500">{errors.startDate}</p>
                      )}
                    </div>

                    {/* End Date */}
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleDateChange(e, "endDate")}
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      />
                      {errors.endDate && (
                        <p className="text-red-500">{errors.endDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Job Description / Requirements
                    </label>
                    <textarea
                      className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      placeholder="Job Description"
                      value={formData.jd}
                      onChange={(e) => handleFormChange(e, "jd")}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Additional Requirements / Comments
                    </label>
                    <textarea
                      className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                      placeholder="additional requirement"
                      value={formData.message}
                      onChange={(e) => handleFormChange(e, "message")}
                    />
                  </div>

                  <div className="flex flex-col justify-left mb-2 md:mb-3">
                    {/* Consent Checkbox */}

                    <div className="font-semibold font-title">
                      Consent to Data Processing :
                    </div>

                    <p className="text-sm">
                      By submitting this form, I consent to the processing of my
                      personal data by Nzuri Healthcare in accordance with data
                      protection regulations, including GDPR, for recruitment
                      purposes.
                    </p>
                  </div>
                  <div className="flex justify-left">
                    {/* Consent Checkbox */}
                    <div className="flex items-center text-24 font-bold">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="mr-4 "
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm font-semibold font-title"
                      >
                        I consent to the processing of my data
                      </label>
                    </div>
                    {errors.checkbox && (
                      <p className="text-red-500">{errors.checkbox}</p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="mt-2 md:mt-8 px-[2em] py-[.5em] mx-1 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans"
                    >
                      Submit
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
