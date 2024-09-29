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
  date: string;
  phoneNumber: number | string;
  message: string;
}

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
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
    const data = { fullName, ...userInfo };
    console.log(data);
    setSubmitting(true);
    try {
      console.log("val: ", data);

      const res = await axios.post("/api/contact", data, {
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
      // console.log("res: ", JSON.stringify(res));
      setSubmitting(false);

      return res.data;
    } catch (error) {
      // Handle errors here
      console.error("Error occurred:", error);
      setSubmitting(false);
      throw error; // Optionally rethrow the error
    }
  };

  // for the underline animation on text on bgImage
  useEffect(() => {
    setTimeout(() => {
      setShowUnderline(true);
    }, 2000); // Adjust the delay as needed
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
              Request a <br />
              <span className="relative inline-block">
                Reference
                {showUnderline && (
                  <span className="absolute left-0 bottom-0 h-2 bg-yellow-500 animate-underline"></span>
                )}
              </span>
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
        <div className="w-full md:w-[80%] px-4 md:px-0 mt-8  relative">
          <div className="w-full flex">
            <div className="p-6 md:p-12 w-full md:w-[60%] mb-[6em]  bg-white rounded-md shadow-md">
              <p className="text-[18px] md:text-[36px] font-bold text-primary">
                Request a Reference
              </p>
              <p>About the healthcare professional</p>

              <div className="w-full mt-8">
                <div className=" flex flex-col md:flex-row items-center gap-x-6 w-full ">
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Professional&apos;s first name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="firstname"
                      type="text"
                      placeholder="First name"
                      value={userInfo.firstName}
                      onChange={(e) => handleFormChange(e, "firstName")}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Professional&apos;s Last name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastname"
                      type="text"
                      placeholder="Last name"
                      onChange={(e) => handleFormChange(e, "lastName")}
                      value={userInfo.lastName}
                    />
                  </div>
                </div>

                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Professional&apos;s Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="you@company.com"
                    value={userInfo.email}
                    onChange={(e) => handleFormChange(e, "email")}
                  />
                </div>

                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Professional&apos;s date of birth
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder=""
                    value={userInfo.date}
                    onChange={(e) => handleFormChange(e, "date")}
                  />
                </div>

                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="tel"
                    placeholder="+44 20 0000 0000"
                    value={userInfo.phoneNumber}
                    onChange={(e) => handleFormChange(e, "phoneNumber")}
                  />
                </div>
                <p className="py-8">About the requestor</p>
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Requester&apos;s name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                    onChange={(e) => handleFormChange(e, "lastName")}
                    value={userInfo.lastName}
                  />
                </div>

                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Requester&apos;s Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="you@company.com"
                    value={userInfo.email}
                    onChange={(e) => handleFormChange(e, "email")}
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={submitForm}
                    disabled={isSubmitting}
                    className="-mt-2 px-[2em] py-[.5em] items-center justify-center mx-1 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
            <div className="md:absolute  -z-10 right-0 hidden md:inline ">
              <Image
                src={"/images/bgSlider-1.jpg"}
                width={200}
                height={300}
                alt="contact form "
                layout="responsive"
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
