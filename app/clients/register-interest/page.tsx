"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/motion/MotionSection";
import Footer from "@/components/ui/Footer";
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

interface countryOptions {
  label: string;
  value: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const Page = () => {
  const reduceMotion = useReducedMotion();
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
  const [countries, setCountries] = useState<countryOptions[]>([]); // Array of CountryOption objects
  const [cities, setCities] = useState<any[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountriesLoading(true);
      setCountriesError(null);
      try {
        // v3.1 requires `fields` (max 10); bare /all returns 400.
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        if (!res.ok) {
          setCountries([]);
          setCountriesError("Could not load countries. Please try again.");
          return;
        }
        const data: unknown = await res.json();
        if (!Array.isArray(data)) {
          setCountries([]);
          setCountriesError("Could not load countries. Please try again.");
          return;
        }
        const countryOptions: countryOptions[] = data
          .map((country: { name?: { common?: string }; cca2?: string }) => ({
            label: country.name?.common ?? "",
            value: country.cca2 ?? "",
          }))
          .filter((c) => c.label && c.value)
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);
      } catch {
        setCountries([]);
        setCountriesError("Could not load countries. Please try again.");
      } finally {
        setCountriesLoading(false);
      }
    };

    void fetchCountries();
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
  // const handleCountryChange = (selectedOption: any) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     country: selectedOption ? selectedOption.value : "",
  //     city: "",
  //     postalCode: "",
  //   }));
  //   fetchCities(selectedOption.value);
  // };

  const handleCountryChange = (selectedOption: countryOptions | null) => {
    setFormData((prev) => ({
      ...prev,
      country: selectedOption?.value ?? "",
    }));
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
      newErrors.checkbox =
        "kindly tick the checkbox to agree consent to the terms and conditions.";
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
    const t = setTimeout(() => setShowUnderline(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="relative w-full min-h-[50vh] bg-cover bg-center sm:min-h-[55vh] md:min-h-[65vh] lg:min-h-[70vh]"
        style={{
          backgroundImage: "url(/images/nurse.jpg)",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/15" />
        <div className="absolute inset-0 flex items-center justify-start">
          <motion.div
            className="w-full"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease }}
          >
            <h1 className="relative mt-12 px-4 font-sans text-[2.5rem] font-normal leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:px-8 sm:text-[3rem] md:px-16 md:text-[3.5rem] lg:px-24 lg:text-[4rem]">
              <span className="relative inline-block">
                Register
                {showUnderline && (
                  <span className="absolute bottom-0 left-0 h-2 bg-yellow-500 animate-underline" />
                )}
              </span>{" "}
              <span>your interest</span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 px-4 font-sans text-white sm:px-8 md:px-16 lg:px-24">
              <div className="flex items-center">
                <MdEmail className="mr-2 shrink-0" aria-hidden />
                <Link href="mailto:info@nzuricares.co.uk" className="underline-offset-2 hover:underline">
                  info@nzuricares.co.uk
                </Link>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 shrink-0" aria-hidden />
                <a href="tel:+442080502662" className="hover:underline">
                  020 8050 2662
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <MotionSection className="mx-auto flex w-full flex-col items-center justify-center px-4 py-8 md:py-16 md:px-6 lg:px-8">
        <div className="relative mt-4 w-full max-w-5xl md:mt-8">
          <div className="flex w-full flex-col items-center justify-center md:flex-row-reverse">
            <motion.div
              className="mb-[1em] w-full items-center justify-center rounded-md bg-white p-6 shadow-md md:mb-[4em] md:w-[90%] md:p-12"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.06 }}
            >
              <h2 className="font-bold text-xl md:text-4xl text-center -mt-8 text-primary">
                Register your interest today
              </h2>
              <p className="text-14 text-center ">
                Register your interest below and our team will be in touch with
                you.
              </p>
              {/* toggle options between individual and company */}
              <div className="flex space-x-4 mt-4 mb-16 items-center justify-center">
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 ${
                    formType === "individual"
                      ? "bg-blue-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setFormType("individual")}
                >
                  Individual
                </button>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 ${
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
                        instanceId="register-interest-country"
                        inputId="register-interest-country-input"
                        options={countries}
                        isLoading={countriesLoading}
                        isDisabled={countriesLoading}
                        placeholder={
                          countriesLoading
                            ? "Loading countries…"
                            : "Select country"
                        }
                        isClearable
                        onChange={handleCountryChange}
                        value={countries.find(
                          (country) => country.value === formData.country
                        )}
                        menuPortalTarget={
                          typeof document !== "undefined"
                            ? document.body
                            : null
                        }
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                      />
                      {countriesError && (
                        <p className="text-red-500 text-sm mt-1">
                          {countriesError}
                        </p>
                      )}
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
                      <input
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none"
                        type="city"
                        placeholder="city"
                        value={formData.city}
                        onChange={(e) => handleFormChange(e, "city")}
                      />
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

                    <p className="text-sm text-justify">
                      By submitting this form, I consent to the processing of my
                      personal data by Nzuri Healthcare Recruitment Limited in
                      accordance with data protection regulations, including
                      GDPR, for recruitment purposes.
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
            </motion.div>
          </div>
        </div>
      </MotionSection>
      <Footer />
    </div>
  );
};

export default Page;
