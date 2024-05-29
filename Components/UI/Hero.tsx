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
      <div ref={imageRef} className="hero-image absolute inset-0 z-0">
        <Image
          src="/images/bgSlider-4.jpg" // Replace with your image path
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="hero-content relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <h1 className="text-base md:text-5xl lg:text-4xl font-normal -mt-48 text-center text-white font-pacifico">
          We have the best professionals at our disposal
        </h1>
        <Link href="/contact"> 
          <button
            className="text-lg md:text-xl lg:text-2xl border border-spacing-8 text-center text-white rounded-md mt-8 font-serif"
            >
            talk to Us today
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
