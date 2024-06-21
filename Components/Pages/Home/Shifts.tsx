import React from "react";
import Image from "next/image";
import Link from "next/link";

const Shifts = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 py-32 lg:px-32">
      <div className="lg:w-1/2 lg:pr-8 rounded w-96 md:w-80 sm:w-72 p-4 mx-4">
        <Image
          src={"/images/shift.jpg"}
          alt={"Shift"}
          width={500}
          height={700}
          className="rounded-lg"
        />
      </div>
      <div className="lg:w-1/2 lg:pl-8">
        <h2 className="text-center lg:text-left px-4 lg:px-0 font-bold text-2xl md:text-2xl lg:text-2xl mt-4 md:mt-0 pb-2 font-title">
          Discover Shift Opportunities
        </h2>
        <p className="text-justify lg:text-left px-4 lg:px-0 font-body">
          Join our Dedicated platform to connect with nursing professionals,
          carers, and support workers seeking fulfilling shifts.
          <br /> Register now and personalize your shift preferences to explore
          availability in your area.
        </p>
        <div className="text-center lg:text-left mt-4">
          <Link
            href="/company/staffing"
            className="mt-1 px-[2em] py-[.5em] mx-[-.2em] bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans inline-block"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shifts;
