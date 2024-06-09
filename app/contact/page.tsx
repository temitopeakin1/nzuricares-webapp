"use client";

import { Header } from "@/Components";
import FadeIn from "@/Components/UI/FadeIn";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/UI/Footer";
import Link from "next/link";
import axios from "axios";
import { MdEmail } from "react-icons/md";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | string;
  message: string;
}

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);
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
              Reach out to <br />
              <span className="relative inline-block">
                Nzurihealthcare
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
            </div>
            <Link href={"/company/careers/#"} passHref>
              <button className="mt-4 px-[2em] py-[.5em] mx-24 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans">
                Contact us
              </button>
            </Link>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-full py-16">
        <div className="w-full md:w-[80%] px-4 md:px-0 mt-8  relative">
          <div className="w-full flex">
            <div className="p-6 md:p-12 w-full md:w-[60%] mb-[6em]  bg-white rounded-md shadow-md">
              <p className="text-[18px] md:text-[36px] font-bold text-primary">
                Get in touch
              </p>

              <p>
                Send us your quick message and we&lsquo;ll get back to you..
              </p>

              <div className="w-full mt-8">
                <div className=" flex flex-col md:flex-row items-center gap-x-6 w-full ">
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First name
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
                      Last name
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
                    Email
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

                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Leave us a message..."
                    rows={5}
                    value={userInfo.message}
                    onChange={(e) => handleFormChange(e, "message")}
                  />
                </div>

                <button
                  onClick={submitForm}
                  disabled={isSubmitting}
                  className="-mt-2 px-[2em] py-[.5em] mx-1 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans"
                >
                  Send Message
                </button>
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
