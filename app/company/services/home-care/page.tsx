"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/ui/Footer";
import Content from "./content";
import { MarketingHero } from "@/components/motion/MarketingHero";
import { MotionSection } from "@/components/motion/MotionSection";

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowUnderline(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <MarketingHero
        backgroundImage="/images/home-care.jpg"
        backgroundPosition="center 35%"
        overlayClassName="absolute inset-0 bg-black/20"
        contentClassName="absolute inset-0 flex items-center justify-start"
      >
        <h1 className="relative mt-12 px-4 font-sans text-[2.5rem] font-normal leading-tight text-white sm:px-8 sm:text-[3rem] md:px-16 md:text-[3.5rem] lg:px-24 lg:text-[4rem]">
          Bringing&nbsp;
          <span className="relative inline-block">
            Home Care
            {showUnderline && (
              <span className="absolute bottom-0 left-0 h-2 bg-yellow-500 animate-underline" />
            )}
          </span>{" "}
          <br />
          <span className="relative inline-block">to Your Doorstep</span>
        </h1>
      </MarketingHero>
      <MotionSection>
        <Content />
      </MotionSection>

      <Footer />
    </div>
  );
};

export default Page;
