"use client";

import { Header } from "@/Components";
import React from "react";
import FadeIn from "@/Components/UI/FadeIn"; // Adjust the path based on your folder structure

const Page = () => {
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
          <FadeIn duration={8}>
            <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-tight mt-12 px-4 sm:px-8 md:px-16 lg:px-24 font-sans font-normal text-white relative">
              The hassle-free solution
              <br /> for{" "}
              <span className="relative inline-block">
                staffing needs
                <span className="absolute h-0.5 w-0 bg-secondary rounded-full animate-pulse -z-1"></span>
              </span>
            </h1>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div>
      </div>
      <div className="py-16 text-center">
        <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
          Engage Us
        </h1>
        <p className="py-4 lg:text-lg md:text-sm font-body">
          We are more than an agency - We are your trusted partner in care.
          Fast, fair, and cost-effective,
          <br /> with real humans ensuring every detail is perfect. From care
          homes to private hospitals to NHS trusts
          <br />
          Discover how we can simplify your work life.
        </p>
      </div>
      <div className="pb-16 text-center">
        <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
          Explore the spectrum of care settings we embrace.
        </h1>
        <p className="mt-2 lg:text-sm md:text-sm">
          From nurturing care homes to advanced private hospitals and esteemed
          NHS trusts, we’ve got you covered.
        </p>
      </div>
    </div>
  );
};

export default Page;
