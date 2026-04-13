"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/ui/Footer";
import Shifts from "./Shifts";
import Testimonial from "./Testimonial";
import Subscribe from "@/components/ui/Subscribe";
import PrivacyBanner from "@/components/ui/PrivacyBanner";
import Profession from "./Services";
import { easeOutExpo } from "@/components/motion/transitions";

const slideTransition = { duration: 0.42, ease: easeOutExpo };

const Sliders = () => {
  const images = [
    "/images/slider-1.jpg",
    "/images/slider-3.jpg",
    "/images/slider-4.jpg",
    "/images/slider-5.jpg",
  ];

  const [index, setIndex] = useState(0);
  const bgImage = images[index];
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
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

  const renderButton = () => {
    if (index === 0 || index === 1 || index === 2 || index === 3) {
      return (
        <Link href={"/healthcare-professionals/how-it-works"} passHref>
          <button className="-mt-8 px-[2em] py-[.5em] bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans">
            Learn more
          </button>
        </Link>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center top 20%",
      }}
      className="relative flex w-full min-h-[50vh] items-center justify-center bg-cover bg-center transition-all duration-500 ease-in-out sm:min-h-[55vh] md:min-h-[70vh] lg:min-h-[78vh]"
    >
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      <div className="w-full">
        <div className="relative z-[60] mt-36 justify-left px-8 text-center font-normal text-white md:mt-32 md:px-24 md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={
                reduceMotion ? false : { opacity: 0, y: 14 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, y: -10 }
              }
              transition={slideTransition}
            >
              <h1 className="font-sans text-[2em] leading-[.9em] md:text-[2rem] lg:text-[3em]">
                {text?.header}
              </h1>
              <div className="-mt-4 flex items-center justify-left">
                <p className="my-8 w-full text-base md:w-auto md:text-xl">
                  {text.tagline}
                </p>
              </div>
              {renderButton()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-2 mt-8 flex w-full items-center justify-center md:bottom-5">
          <div className="flex items-center gap-4">
            {Array(images.length)
              .fill(0)
              .map((_, index_) => (
                <button
                  type="button"
                  aria-label={`Show slide ${index_ + 1}`}
                  onClick={() => setIndex(index_)}
                  key={index_}
                  className={`h-[1em] rounded-full transition-all duration-200 ease-linear hover:scale-125 hover:bg-primary/70 ${
                    index_ === index
                      ? "w-[2em] bg-primary"
                      : "w-[1em] bg-gray-400/45"
                  }`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <main>
      <Sliders />
      <Profession />
      <Shifts />
      <Testimonial testimonials={[]} />
      <Subscribe />
      <Footer />
      <PrivacyBanner />
    </main>
  );
};

export default HomePage;
