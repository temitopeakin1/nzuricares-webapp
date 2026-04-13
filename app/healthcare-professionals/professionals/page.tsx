"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/motion/MotionSection";

const section_data = [
  {
    title: "Registered Nurses",
    text: "Our Registered Nurses play a critical role in healthcare by providing direct patient care, administering medications, monitoring vital signs, and educating patients and families. They are skilled in assessing, planning, and implementing treatment plans, ensuring the well-being of patients in hospitals, clinics, and community settings.",
    image: "/images/imge.jpg",
  },
  {
    title: "Carers",
    text: "Our Carers provide essential personal care and support to individuals with chronic illnesses, disabilities, or aging-related needs. They assist with daily activities such as bathing, dressing, feeding, and mobility, promoting comfort and improving quality of life for those they care for.",
    image: "/images/mission.jpg",
  },
  {
    title: "Support Workers",
    text: "Support Workers assist individuals with physical, mental, or emotional needs, offering personalized care and helping with daily tasks. They work closely with patients and families, providing companionship, personal care, and supporting overall well-being in home or healthcare settings.",
    image: "/images/support-workers.jpg",
  },
  {
    title: "Cleaners",
    text: "Our Cleaners in healthcare environments are dedicated to maintaining high standards of cleanliness and hygiene. They play a vital role in preventing infections by thoroughly cleaning and disinfecting patient rooms, medical equipment, and communal areas, ensuring a safe and sterile environment for both patients and staff.",
    image: "/images/cleanerz.jpg",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const Section = ({
  title,
  text,
  image,
  index,
}: {
  title: string;
  text: string;
  image: string;
  index: number;
}) => {
  const reduceMotion = useReducedMotion();
  const isReverse = index % 2 === 0;

  return (
    <MotionSection className="w-full">
      <div
        className={`flex flex-col items-center justify-center gap-[20px] p-2 md:gap-[98px] md:p-8 ${
          isReverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <motion.div
          className="flex w-full flex-1 items-center justify-center rounded-md bg-[#F4F4F4] p-4"
          initial={
            reduceMotion ? false : { opacity: 0, x: isReverse ? 28 : -28 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 0.5,
            ease,
            delay: reduceMotion ? 0 : 0.06,
          }}
        >
          <Image
            width={400}
            height={300}
            src={image}
            alt={title}
            className="h-full w-full rounded-md object-cover"
          />
        </motion.div>
        <motion.div
          className="flex-1"
          initial={
            reduceMotion ? false : { opacity: 0, x: isReverse ? -22 : 22 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 0.5,
            ease,
            delay: reduceMotion ? 0 : 0.14,
          }}
        >
          <p className="text-center font-title text-xl font-bold leading-none text-[#283544] md:text-justify md:text-4xl">
            {title}
          </p>
          <p className="mt-2 justify-center px-4 text-justify font-body text-[16px] sm:px-0 md:px-0 md:text-[18px]">
            {text}
          </p>
        </motion.div>
      </div>
    </MotionSection>
  );
};

const Page = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <MotionSection className="flex w-full flex-col items-center justify-center bg-[#FAFAFA] py-0 md:py-10">
        <div className="flex w-full flex-col items-center justify-center">
          <Image
            src="/images/slider-1.jpg"
            width={1200}
            height={600}
            className="mt-20 w-full sm:mt-2 md:mt-4 md:w-[70%] lg:mt-4"
            alt="Nzuri Healthcare professionals supporting clients"
            priority
          />
        </div>
      </MotionSection>

      <MotionSection className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center py-0 md:py-8">
        <p className="regular items-center justify-center p-8 text-justify text-xl font-semibold md:mt-0 md:p-8 md:text-justify">
          At Nzuri HealthCare, we believe that exceptional care begins with a
          compassionate heart and a professional touch. Our dedicated team of
          carers is committed to providing personalised, high-quality care that
          enhances the quality of life for you and your loved ones. Whether its
          assistance with daily activities, specialized medical care, or simply a
          friendly companion, we are here to support you every step of the way.
          Our professional carers, Nurses, and Support Workers are here to provide
          the compassionate, reliable assistance that makes a meaningful difference
          in your life.
        </p>
      </MotionSection>

      <div className="mt-12 flex items-center justify-center">
        <div className="w-full md:w-[80%]">
          {section_data.map((item, index) => (
            <Section
              key={item.title}
              title={item.title}
              text={item.text}
              image={item.image}
              index={index}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
