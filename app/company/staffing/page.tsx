"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaBed, FaHospital } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { PiMapPinLineFill, PiUserSwitchBold } from "react-icons/pi";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { MdOutlineLocalHospital } from "react-icons/md";
import Footer from "@/components/ui/Footer";
import { MarketingHero } from "@/components/motion/MarketingHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { serviceGridVariants } from "@/components/motion/home-variants";

const careSettings = [
  { icon: FaHospital, title: "NHS Hospitals" },
  { icon: FaBed, title: "Residential Care Homes" },
  { icon: PiMapPinLineFill, title: "Domiciliary care services" },
  { icon: MdOutlineLocalHospital, title: "Private Hospitals" },
  { icon: PiUserSwitchBold, title: "Supported Living environments" },
  { icon: HiMiniArrowsPointingIn, title: "Complex care services" },
];

interface CareSettingsProps {
  icon: IconType;
  title: string;
}

const CareSettings: React.FC<CareSettingsProps> = ({ icon: Icon, title }) => {
  return (
    <div className="mx-4 my-2 flex w-full flex-col items-center p-4">
      <Icon size={64} className="text-white" aria-hidden />
      <p className="mt-2 text-lg font-semibold text-white">{title}</p>
    </div>
  );
};

const ease = [0.22, 1, 0.36, 1] as const;

const Page = () => {
  const reduceMotion = useReducedMotion();
  const [showUnderline, setShowUnderline] = useState(false);
  const { container, item } = serviceGridVariants(reduceMotion);

  useEffect(() => {
    const t = setTimeout(() => setShowUnderline(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <MarketingHero
        backgroundImage="/images/nurse.jpg"
        backgroundPosition="center top"
        overlayClassName="absolute inset-0 bg-black/50"
        contentClassName="absolute inset-0 flex items-center justify-start"
      >
        <h1 className="relative mt-12 px-4 font-sans text-[2.5rem] font-normal leading-tight text-white sm:px-8 sm:text-[3rem] md:px-16 md:text-[3.5rem] lg:px-24 lg:text-[4rem]">
          The hassle-free solution
          <br /> for{" "}
          <span className="relative inline-block">
            staffing needs
            {showUnderline && (
              <span className="absolute bottom-0 left-0 h-2 bg-yellow-500 animate-underline" />
            )}
          </span>
        </h1>
      </MarketingHero>

      <MotionSection className="mx-4 py-8 text-center md:mx-36 md:py-16">
        <h2 className="mt-2 font-title text-xl font-bold text-blue-800 md:text-4xl">
          Engage Us
        </h2>
        <p className="py-2 font-body text-sm md:text-sm lg:text-lg">
          We are more than a recruitment agency - We are your trusted partner in
          care. We quick, fair, and cost-effective
          <br /> With real humans ensuring every detail is perfect. From care
          homes to private hospitals to NHS trusts
          <br />
          Discover how we can simplify your work life.
        </p>

        <h2 className="mt-2 font-title text-xl font-bold text-blue-800 md:mt-8 md:text-4xl">
          Explore the spectrum of care settings we embrace.
        </h2>
        <p className="mt-2 font-body text-sm md:text-sm lg:text-lg">
          From nurturing care homes to advanced private hospitals and esteemed
          NHS trusts, we have got you covered.
        </p>
        <motion.div
          className="mx-auto mt-8 flex max-w-screen-lg justify-center rounded-xl bg-primary p-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px 0px" }}
          transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.06 }}
        >
          <motion.div
            className="mx-auto grid grid-cols-2 items-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px 0px" }}
          >
            {careSettings.map((value, index) => (
              <motion.div
                key={value.title}
                variants={item}
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </MotionSection>
      <Footer />
    </div>
  );
};

export default Page;
