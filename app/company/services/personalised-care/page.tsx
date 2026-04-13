"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/ui/Footer";
import Personal from "./personal";
import ChooseSection from "./chooseSection";
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
        backgroundImage="/images/holistic.jpg"
        backgroundPosition="center 25%"
        overlayClassName="absolute inset-0 bg-black/25"
        contentClassName="absolute inset-0 flex items-end justify-start pb-12 pt-28 sm:items-center sm:pb-16 sm:pt-24 md:pb-20 md:pt-28"
      >
        <h1 className="max-w-[min(100%,42rem)] px-4 font-sans text-3xl font-normal leading-tight text-white sm:max-w-none sm:px-8 sm:text-4xl md:px-12 md:text-5xl lg:px-16 lg:text-6xl">
          Where&nbsp;
          <span className="relative inline-block">
            Personalised Care
            {showUnderline && (
              <span className="absolute bottom-0 left-0 h-1.5 w-full bg-yellow-500 animate-underline sm:h-2" />
            )}
          </span>{" "}
          <br />
          <span className="relative mt-1 inline-block sm:mt-0">
            Meets Trusted Support
          </span>
        </h1>
      </MarketingHero>
      <MotionSection>
        <Personal />
      </MotionSection>
      <MotionSection delay={0.06}>
        <ChooseSection />
      </MotionSection>
      <Footer />
    </div>
  );
};

export default Page;
