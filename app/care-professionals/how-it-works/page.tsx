"use client";

import { Header } from "@/Components";
import Accordion from "@/Components/UI/Accordion";
import AnimatedArrow from "@/Components/UI/AnimatedArrow";
import FadeIn from "@/Components/UI/FadeIn";
import Footer from "@/Components/UI/Footer";
import Hero from "@/Components/UI/Hero";

import ProcessStep from "@/Components/UI/ProcessStep";
import { useEffect, useState } from "react";

const accordion_data = [
  {
    title: "What is Nzuricares about",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "What sector does Nzuricares covers for",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "What agencies does Nzuricares partners with",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "What are your standards for ensuring data protection?",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "How easy is it to get onboarded into Nzuricares",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  // for the circle animation on text
  useEffect(() => {
    setTimeout(() => {
      setShowUnderline(true);
    }, 1000); // Adjust the delay as needed
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
              Discover how our <br />
              <span className="relative inline-block mr-4">
                {" "}
                {/* Added mr-4 class */}
                seamless
                {showUnderline && (
                  <span className="absolute left-0 bottom-0 h-2 bg-yellow-500 animate-underline"></span>
                )}
              </span>
              <br /> processes makes the difference
            </h1>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div> {/* Adjust height as needed */}
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#FAFAFA] flex items-center justify-center py-16">
          <div className="w-[92%] md:w-[80%] md:grid grid-cols-3 items-center  ">
            <h1 className="text-blue-800 font-bold lg:text-2xl md:text-3xl mb-3 md:mb-0 font-title">
              About Nzuricares
            </h1>
            <p className="leading-8 md:leading-10 text-justify col-span-2 font-body">
              We are a CareProvider Recruitment firm, We provide accessible,
              high-quality healthcare services that promote wellness, empower
              individuals, and enhance the quality of life for all members of
              our community.”
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 text-center">
        <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
          Our Processes
        </h1>
        <div className="relative w-full flex flex-col items-center justify-center">
          <div className="relative w-[30rem] h-[30rem] my-32 flex items-center justify-center">
            <div className="absolute top-0 transform translate-y-[-50%] w-40 h-40 bg-red-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white font-bold py-2">Sign Up</h3>
                <p className="text-white text-sm">
                  Sign up to register an account
                </p>
              </div>
            </div>
            <div className="absolute left-0 transform -translate-x-1/2 w-40 h-40 bg-blue-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white font-bold py-2">Verify</h3>
                <p className="text-white text-sm">Verify your email address</p>
              </div>
            </div>

            <div className="absolute bottom-0 transform translate-y-[50%] w-40 h-40 bg-yellow-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white font-bold py-2">Login</h3>
                <p className="text-white text-sm">Login to register</p>
              </div>
            </div>
            <div className="absolute right-0 transform translate-x-1/2 w-40 h-40 bg-green-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white font-bold py-2">Register</h3>
                <p className="text-white text-sm">Register your profile</p>
              </div>
            </div>
            {/* Adding SVG arrows with Tailwind animation */}
            <svg
              className="absolute w-108 h-24 left-[2rem] top-[-1rem] translate rotate-45"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 100 L180 100 M100 20 L180 100 L100 180"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute w-96 h-24 right-[15rem] top-[20rem] bottom-[-1rem] transform rotate-45"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 100 L180 100 M100 20 L180 100 L100 180"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute w-96 h-24 right-[15rem] top-[20rem] bottom-[-1rem] transform rotate-45"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 100 L180 100 M100 20 L180 100 L100 180"
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute w-96 h-24 right-[-16rem] top-[5rem] transform rotate-45"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 100 L180 100 M100 20 L180 100 L100 180"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12 px-4 bg-gray-50">
        <div className="w-full md:w-[80%] mb-8">
          <h2 className="text-2xl font-bold text-center mt-16 font-title">
            Got questions? We’ve got answers
          </h2>
          <p className="text-lg mt-2 text-center mb-8 md:mb-4">
            FAQ, See if we’ve answered your questions
          </p>
          {accordion_data.map((item) => (
            <Accordion
              key={item.title}
              title={item?.title}
              detail={item?.detail}
            />
          ))}
        </div>
      </div>
      <Hero />
      <Footer />
    </div>
  );
};

export default Page;
