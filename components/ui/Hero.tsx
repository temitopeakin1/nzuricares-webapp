"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0); // Track previous scroll position

  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;
      const parallaxFactor = 0.01; // Adjust this value to control parallax effect strength

      // Calculate direction of scroll (up or down)
      const scrollDirection = yPos > lastScrollY ? "down" : "up";

      // Update lastScrollY only on scroll down to maintain parallax effect
      if (scrollDirection === "down") {
        setLastScrollY(yPos);
      }

      // Apply parallax effect only based on scroll direction
      if (imageRef.current && scrollDirection === "down") {
        imageRef.current.style.transform = `translateY(-${
          yPos * parallaxFactor
        }px)`;
      } else if (imageRef.current && scrollDirection === "up") {
        // On scroll up, reset the transform to maintain the last downward scroll position
        imageRef.current.style.transform = `translateY(-${
          lastScrollY * parallaxFactor
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Update effect when lastScrollY changes

  return (
    <div className="hero relative overflow-hidden h-[400px] -mb-16">
      <div
        ref={imageRef}
        className="hero-image absolute inset-0 bg-opacity-50 z-0" 
      >
        <Image
          src="/images/slider-4.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="hero-content relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <h1 className="text-2xl md:text-5xl lg:text-4xl font-normal -mt-48 text-center text-white font-sans">
          We have the best professionals at our disposal
        </h1>
        <Link href="/contact">
        <button className="mt-4 px-[2em] py-[.5em] mx-1 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans">
            Contact us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
