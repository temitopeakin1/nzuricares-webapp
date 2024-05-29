import React from "react";
import Image from "next/image";
import Link from "next/link";

const Shifts = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 py-32 lg:px-32">
      <div className="lg:w-1/2 lg:pr-8 rounded">
        <Image
          src={"/images/shift.jpg"}
          alt={"Shift"}
          width={500}
          height={700}
          className="rounded-lg"
        />
      </div>
      <div className="lg:w-1/2 lg:pl-8">
        <h2 className="text-center lg:text-left px-4 lg:px-0 font-bold text-2xl md:text-2xl lg:text-2xl pb-2 font-title">
          Discover Shift Opportunities
        </h2>
        <p className="text-justify lg:text-left px-4 lg:px-0 font-body">
          Join our Dedicated platform to connect with nursing professionals,
          caregivers, and support workers seeking fulfilling shifts.
          <br /> Register now and personalize your shift preferences to explore
          availability in your area.
        </p>
        <div className="text-center lg:text-left mt-4">
          <Link
            href="/staffing"
            className="text-white bg-primary px-4 py-2 rounded-full inline-block"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shifts;
