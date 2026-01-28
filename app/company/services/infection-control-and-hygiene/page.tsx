"use client";

import { Header } from "@/components";
import FadeIn from "@/components/ui/FadeIn";
import { useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import Footer from "@/components/ui/Footer";

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
        className="w-full relative bg-cover bg-center h-[60vh] md:h-[100vh] sm:bg-contain sm:bg-center-15% md:bg-cover md:bg-center-[40%]"
        style={{
          backgroundImage: "url(/images/infections.jpg)",
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-20">
          <FadeIn duration={4}>
            <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-tight mt-12 px-4 sm:px-8 md:px-16 lg:px-24 font-sans font-normal text-white relative">
              Experts In Infection Control&nbsp;
              <span className="relative inline-block">
                 and
              </span>
              <br />
              <span className="relative inline-block">
                Hygiene Staffing
                {showUnderline && (
                  <span className="absolute left-0 bottom-0 h-2 bg-yellow-500 animate-underline"></span>
                )}
              </span>
            </h1>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
