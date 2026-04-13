"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { MarketingHero } from "@/components/motion/MarketingHero";
import { MotionSection } from "@/components/motion/MotionSection";

const careers = [
  {
    title: "Objectives",
    image: "/images/mission.jpg",
    text: `We are on a mission to revolutionize the health and care industry in the UK and beyond,
           equipping staff with the tools, opportunities, and transparency they need to excel, one shift at a time.<br /> 
           We believe that our strength lies in the diversity of our skills, experiences, and talents. As we empower care teams, 
           we are equally committed to fostering a collaborative, respectful, and inclusive environment for our colleagues.<br /><b>Become part of a purpose-driven healthcare company and join us in making a meaningful impact.</b>`,
  },
  {
    title: "Equality, Diversity and Inclusion",
    image: "/images/diversity.jpg",
    text: "Diversity and inclusion are fundamental principles in our healthcare recruitment agency. We believe that by embracing a wide range of backgrounds, perspectives, and experiences, we can provide more compassionate, effective, and personalised care to our clients. ",
  },
  {
    title: "Careers",
    image: "/images/bgWork.jpg",
    text: "In our agency, we have a diverse team of professionals fulfilling various roles to ensure comprehensive care and support for our clients. Our team includes Carers, Registered Nurses, administrative support staff, and support health workers, amongst others. Each member of our team plays a crucial role in delivering high-quality care services and maintaining the well-being of our clients.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const Section = ({
  title,
  image,
  text,
  index,
}: {
  title: string;
  image: string;
  text: string;
  index: number;
}) => {
  const reduceMotion = useReducedMotion();
  const isReverse = index % 2 === 0;

  return (
    <MotionSection className="w-full">
      <div
        className={`flex flex-col items-center justify-center gap-[20px] p-2 md:gap-[98px] md:p-8 ${
          isReverse ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <motion.div
          className="flex w-full flex-1 items-center justify-center rounded-md bg-[#F4F4F4] p-4"
          initial={
            reduceMotion ? false : { opacity: 0, x: isReverse ? -28 : 28 }
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
            height={400}
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div
          className="flex-1"
          initial={
            reduceMotion ? false : { opacity: 0, x: isReverse ? 22 : -22 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 0.5,
            ease,
            delay: reduceMotion ? 0 : 0.14,
          }}
        >
          <p className="text-center text-[24px] font-bold sm:text-[20px] md:text-start md:text-[28px]">
            {title}
          </p>
          <p
            className="text-[16px] px-4 text-justify md:px-0 md:text-[18px]"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </motion.div>
      </div>
    </MotionSection>
  );
};

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowUnderline(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <MarketingHero
        backgroundImage="/images/caregiver.jpg"
        backgroundPosition="center top -10%"
        overlayClassName="absolute inset-0 bg-black/40"
        contentClassName="absolute inset-0 flex items-center justify-start"
      >
        <h1 className="relative mt-12 px-4 font-sans text-[2.5rem] font-normal leading-tight text-white sm:px-8 sm:text-[3rem] md:px-16 md:text-[3.5rem] lg:px-24 lg:text-[4rem]">
          Careers at
          <br />
          <span className="relative inline-block">
            Nzuri Healthcare
            {showUnderline && (
              <span className="absolute bottom-0 left-0 h-2 bg-yellow-500 animate-underline" />
            )}
          </span>
        </h1>
      </MarketingHero>

      <div className="mt-12 flex items-center justify-center">
        <div className="w-full md:w-[80%]">
          {careers.map((item, index) => (
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
      <div className="mt-4 flex justify-center">
        <Link
          href="/auth/signup"
          className="mx-2 mt-2 inline-block transform rounded-full bg-gradient-to-r from-blue-900 to-green-700 px-[2em] py-[.5em] font-sans text-base text-white transition-all duration-300 hover:scale-110 hover:bg-red-400 md:text-xl"
        >
          <span className="font-title text-2xl font-semibold">Sign up today</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
