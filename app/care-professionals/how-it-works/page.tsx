import { Header } from "@/Components";
import Accordion from "@/Components/UI/Accordion";
import AnimatedScroll from "@/Components/UI/AnimatedScroll";
import Footer from "@/Components/UI/Footer";
import React from "react";

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
    title: "What can of staff do you provide",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "What are your standards for ensuring data protection?",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "What kind of staff can you provide?",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const Page = () => {
  return (
    <div>
      <Header />
      <div
        className="w-full relative bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/nurse.jpg)",
          backgroundPosition: "center top", // Adjust this value as needed
          backgroundSize: "cover", // This ensures the image covers the entire div
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-3xl md:text-3xl sm:text-xl font-normal text-white text-center px-2 mt-48 font-sans">
          Discover How Our Seamless Processes Make a Difference <br /> Follow the Steps Below!
          </h1>
          <div className="flex items-center justify-center text-center">
          <AnimatedScroll targetId="faq-section" />
          </div>
        </div>
        <div className="h-[80vh]"></div> {/* Adjust height as needed */}
      </div>
      <div className="flex flex-col items-center justify-center mt-12 px-4 bg-gray-50">
        <div className="w-full md:w-[60%] mb-8">
          <h2 className="text-2xl font-bold text-center mt-16">
            Got questions? We’ve got answers
          </h2>
          <p className="text-lg mt-2 text-center mb-8 md:mb-4">
            See if we’ve answered it here. It’s usually the fastest way to get
            the info you need.
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
      <Footer />
    </div>
  );
};

export default Page;
