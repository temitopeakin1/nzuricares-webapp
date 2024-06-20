"use client";

import { Header } from "@/Components";
import Accordion from "@/Components/UI/Accordion";
import FadeIn from "@/Components/UI/FadeIn";
import Footer from "@/Components/UI/Footer";
import Hero from "@/Components/UI/Hero";
import { useEffect, useState } from "react";

const accordion_data = [
  {
    title: "What is Nzuri healthcare about",
    detail:
      "Nzuri Healthcare is dedicated to providing exceptional healthcare services by connecting clients with qualified and compassionate carers. The organization emphasizes core values such as compassion, professionalism, and reliability to ensure that clients receive high-quality care. Nzuri Healthcare aims to facilitate meaningful and supportive relationships between carers and those in need of care, ensuring that both parties benefit from the services offered. Through a seamless and well-structured process, Nzuri Healthcare strives to make a positive difference in the healthcare sector.",
  },
  {
    title: "What sector does Nzuri healthcare covers for",
    detail:
      "Nzuricares operates within the healthcare sector, offering services that facilitate exceptional care provision. It aims to connect clients seeking care with carers looking for rewarding job opportunities, all while maintaining core values of compassion, professionalism, and reliability. This ensures meaningful and supportive relationships between clients and carers",
  },
  {
    title: "What agencies does Nzuri healthcare partners with",
    detail:
      "Nzuri healthcare partners with varieties of organisations, such as Healthcare centers, Residential Care homes, Private hospitals, NHS hospitals, Community health organisations and lot more.",
  },
  {
    title: "What are your standards for ensuring data protection?",
    detail:
      "At Nzuri healthcare, we ensure data (clients) is fully encrypted to the highest standard and not in anyway shared with anyone or thirdparty. We comply full to legal standards adhering to all relevant data protection laws and regulations",
  },
  {
    title: "How easy is it to get onboarded into Nzuri healthcares",
    detail:
      "Getting onboarded into Nzuri healthcare is designed to be a seamless and straightforward process. We have streamlined our onboarding procedure to ensure that new clients and partners can quickly and easily start benefiting from our services. Check our how it works Page for more information"
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
        <div className="h-[80vh]"></div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#FAFAFA] flex items-center justify-center py-16">
          <div className="w-[92%] md:w-[80%] md:grid grid-cols-3 items-center  ">
            <h1 className="text-blue-800 font-bold lg:text-2xl md:text-3xl mb-3 md:mb-0 font-title">
              How it Works
            </h1>
            <p className="leading-8 md:leading-10 text-justify col-span-2 font-body">
              &quot;Welcome to Nzuri Healthcare, your trusted partner in finding
              and providing exceptional care. Understanding how our service
              works is key to making the most of what we offer, whether you are
              a client seeking care or a carer looking for rewarding job
              opportunities&quot; Our process is built around core values of
              compassion, professionalism, and reliability. These values guide
              every step we take to connect clients and carers in meaningful and
              supportive relationships.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 text-center">
        <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
          Our Processes
        </h1>
        <div className="relative w-full flex flex-col items-center justify-center">
          <div className="relative w-[12rem] h-[12rem] sm:w-[20rem] sm:h-[20rem] mt-24 sm:my-28 flex items-center justify-center">
            <div className="absolute top-0 transform translate-y-[-50%] w-32 h-32 sm:w-40 sm:h-40 bg-red-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white text-xl font-bold py-2">Sign Up</h3>
                <p className="text-white text-sm">
                  Sign up to register an account
                </p>
              </div>
            </div>
            <svg
              className="absolute w-8 h-48 right-[16rem] top-[-2rem] transform rotate-90 hidden sm:block"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 100 L180 100 M100 20 L180 100 L100 180"
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="absolute left-0 transform -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40  bg-blue-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white text-xl font-bold py-2">Verify</h3>
                <p className="text-white text-sm">Verify your email address</p>
              </div>
            </div>

            <svg
              className="absolute w-8 h-48 right-[13.5rem] top-[8.7rem] transform rotate-45 hidden sm:block"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 100 L180 100 M100 20 L180 100 L100 180"
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="absolute bottom-0 transform translate-y-[50%] w-32 h-32 sm:w-40 sm:h-40  bg-yellow-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white text-xl font-bold py-2">Login</h3>
                <p className="text-white text-sm">Login to register</p>
              </div>
            </div>
            <svg
              className="absolute w-8 h-48 left-[14rem] top-[9rem] transform -rotate-45 hidden sm:block"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 100 L180 100 M100 20 L180 100 L100 180"
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute right-0 transform translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40  bg-green-500 rounded-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-white text-xl font-bold py-2">Register</h3>
                <p className="text-white text-sm">Register your profile</p>
              </div>
            </div>
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
