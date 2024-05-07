"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/Components";
import Services from "./Services";
import Footer from "@/Components/UI/Footer";
import Shifts from "./Shifts";
import Testimonials from "./Testimonials";

// import { Header } from "@/Components";

const Sliders = () => {
  const images = [
    "/images/bgSlider-1.jpg",
    "/images/bgSlider-3.jpg",
    "/images/bgSlider-4.jpg",
    "/images/bgSlider-5.jpg",
  ];

  // set states
  const [index, setIndex] = useState(0);
  const bgImage = images[index];

  // create some side effect on the image slider
  useEffect(() => {
    // autoslide every 5 secs
    const interval = setInterval(() => {
      // cyclical index increment
      setIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const text = (() => {
    switch (index) {
      case 0:
        return {
          header: "Community care",
          tagline: "Bringing comfort and companionship to those in need.",
        };
      case 1:
        return {
          header: "Dedicated Professionals",
          tagline: "Providing tailored care solutions with commitment",
        };
      case 2:
        return {
          header: "Regular Trainings",
          tagline: `We train prospective care workers on how \n
            to get the job done`,
        };
      case 3:
        return {
          header: "Full Shifts, Zero stress ",
          tagline: "Your health care needs, effortlessly met",
        };
      default:
        return {
          header: "",
          tagline: "",
        };
    }
  })();

  // to have the Learn more button on all slider
  const renderButton = () => {
    if (index === 0 || index === 1 || index === 2 || index === 3) {
      return (
        <Link href={"/care-professionals/how-it-works"} passHref>
         <button className="-mt-4 px-[2em] py-[.5em] bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out">
            Learn more
          </button>
        </Link>
      );
    }
    return null;
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center top 28%' }}
      className={`${bgImage} bg-cover bg-center h-[50vh] md:h-[90vh] bg-opacity-100  flex justify-center items-center relative transition-all duration-500 ease-in-out`}
    >
      <div className="w-full ">
        <div className="px-24 mt-32 text-white font-semibold justify-left ">
          <h1 className="text-[1em] lg:text-[3em] md:text-[2rem]   leading-[.9em]  ">
            {text?.header}
          </h1>
          <div className="flex items-center font-normal -mt-2 justify-left ">
            <p className="my-8 text-base md:text-xl w-full md:w-[50%]">
              {text.tagline}
            </p>
          </div>
          {renderButton()}
        </div>

        <div className="w-full flex justify-center items-center absolute bottom-2 md:bottom-5 mt-8">
          <div className="flex items-center gap-4">
            {Array(images.length)
              .fill(0)
              .map((_, index_) => (
                <div
                  onClick={() => setIndex(index_)}
                  key={index_}
                  className={`h-[1em] ${
                    index_ === index
                      ? "bg-primary w-[2em]"
                      : "bg-gray-400/45 w-[1em]"
                  } rounded-full cursor-pointer hover:scale-125 hover:bg-primary/70 transition-all duration-200 ease-linear`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [slider, setSlider] = useState(2);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollThreshold = 100; // Adjust this threshold as needed

    setIsScrolled(scrollTop > scrollThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main>
      <div className="sticky top-0 z-40">
        {/* {showNotification && <Notification setShowNotification={setShowNotification} />} */}
      </div>
      <Header />
      <Sliders />
      <Services />
      <Shifts />
      <Testimonials />
      <Footer />
      
      
    </main>
  );
};

export default HomePage;
