"use client";

import { Header } from "@/Components";
import FadeIn from "@/Components/UI/FadeIn";
import { useEffect, useState } from "react";
import { FaBed, FaHospital } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { PiMapPinLineFill, PiUserSwitchBold } from "react-icons/pi";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { MdOutlineLocalHospital } from "react-icons/md";
import Footer from "@/Components/UI/Footer";

const careSettings = [
  {
    icon: FaHospital,
    title: "NHS Hospitals",
  },
  {
    icon: FaBed,
    title: "Residential Care Homes",
  },
  {
    icon: PiMapPinLineFill,
    title: "Domiciliary care services",
  },
  {
    icon: MdOutlineLocalHospital,
    title: "Private Hospitals",
  },
  {
    icon: PiUserSwitchBold,
    title: "Supported Living environments",
  },
  {
    icon: HiMiniArrowsPointingIn,
    title: "Complex care services",
  },
];

interface CareSettingsProps {
  icon: IconType;
  title: string;
}

const CareSettings: React.FC<CareSettingsProps> = ({ icon: Icon, title }) => {
  return (
    <div className="flex flex-col items-center w-full p-4 mx-4 my-2">
      <Icon size={64} className="text-white" />
      <p className="mt-2 text-lg font-semibold text-white">{title}</p>
    </div>
  );
};

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  // for the underline animation on text
  useEffect(() => {
    setTimeout(() => {
      setShowUnderline(true);
    }, 2000); // Adjust the delay as needed
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
              The hassle-free solution
              <br /> for{" "}
              <span className="relative inline-block">
                staffing needs
                {showUnderline && (
                  <span className="absolute left-0 bottom-0 h-2 bg-yellow-500 animate-underline"></span>
                )}
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
        <p className="py-4 lg:text-lg md:text-sm font-body ju">
          We are more than an agency - We are your trusted partner in care.
          Fast, fair, and cost-effective,
          <br /> with real humans ensuring every detail is perfect. From care
          homes to private hospitals to NHS trusts
          <br />
          Discover how we can simplify your work life.
        </p>
      </div>
      <div className="py-4 text-center">
        <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
          Explore the spectrum of care settings we embrace.
        </h1>
        <p className="mt-2 lg:text-sm md:text-sm font-body">
          From nurturing care homes to advanced private hospitals and esteemed
          NHS trusts, we’ve got you covered.
        </p>
        <div className="flex justify-center bg-primary rounded-xl mt-16 max-w-screen-lg mx-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center mx-auto">
            {careSettings.map((value, index) => (
              <div
                key={index}
                className={`relative ${
                  index % 2 !== 0 && index !== 3
                    ? "sm:border-l-2 sm:border-gray-300"
                    : ""
                } ${
                  index >= 2 && index % 3 !== 0
                    ? "md:border-l-2 md:border-gray-300"
                    : ""
                }`}
              >
                <CareSettings icon={value.icon} title={value.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
