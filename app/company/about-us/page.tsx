"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/ui/Footer";
import {
  FaHeart,
  FaStar,
  FaUsers,
  FaHandshake,
  FaLightbulb,
  FaAccessibleIcon,
  FaLeaf,
  FaShieldAlt,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import Subscribe from "@/components/ui/Subscribe";
import { MotionSection } from "@/components/motion/MotionSection";
import { serviceGridVariants } from "@/components/motion/home-variants";

const section_data = [
  {
    title: "Our Mission",
    Description:
      "To provide accessible, reliable and professional staffing solutions tailored to your specific business needs. We aim to promote wellness of our healthcare partners, empower individuals, sustainability and enhance the quality of life for all",
  },
  {
    title: "Our Vision",
    Description:
      "Making the world a better place to live-in by passionately promoting well-being of our people, partners and our community",
  },
];

const coreValues = [
  {
    icon: FaHeart,
    title: "Compassion",
    description:
      "We treat every individual with empathy, understanding, and kindness, fostering a supportive environment for healing and well-being.",
  },
  {
    icon: FaStar,
    title: "Excellence",
    description:
      "We are committed to delivering exceptional healthcare services, utilising the latest medical advancements and best practices to ensure the highest standards of care.",
  },
  {
    icon: FaUsers,
    title: "Respect",
    description:
      "We honour the dignity, autonomy, and diversity of each person, valuing their unique needs, perspectives, and contributions",
  },
  {
    icon: FaHandshake,
    title: "Collaboration",
    description:
      "We believe in working closely with patients, families, carers, and healthcare professionals to achieve the best possible outcomes through teamwork and cooperation",
  },
  {
    icon: FaShieldAlt,
    title: "Integrity",
    description:
      "We uphold the highest ethical standards, honesty, and transparency in all our interactions, earning the trust and confidence of those we serve.",
  },
  {
    icon: FaLightbulb,
    title: "Innovation",
    description:
      "We embrace creativity, continuous learning, and innovation to continuously improve our services, processes, and outcomes",
  },
  {
    icon: FaAccessibleIcon,
    title: "Accessibility",
    description:
      "We strive to make healthcare services accessible and inclusive for everyone, regardless of their background, socioeconomic status, or physical abilities",
  },
  {
    icon: FaLeaf,
    title: "Sustainability",
    description:
      "We are committed to environmental sustainability and responsible resource management, minimising our ecological footprint while delivering effective healthcare solutions.",
  },
];

const target_audience = [
  {
    title: "Patients",
    description:
      "Individuals seeking medical care, treatment, and support for various health concerns, illnesses, and conditions.",
  },
  {
    title: "Families and Carers",
    description:
      "Relatives, guardians, or friends responsible for the care and well-being of patients, often involved in decision-making and providing support",
  },
  {
    title: "HealthCare Professionals",
    description:
      "Doctors, nurses, therapists, pharmacists, and other healthcare providers who collaborate with the agency to deliver medical services and support.",
  },
  {
    title: "Community Organisations",
    description:
      "Non-profit organizations, charities, and community groups working to improve health outcomes and access to healthcare services within local communities.",
  },
  {
    title: "Government Agencies",
    description:
      "Public health organizations, regulatory bodies, and government departments involved in healthcare policy, funding, and oversight.",
  },
  {
    title: "Educational Institutions",
    description:
      "Schools, colleges, and universities involved in healthcare education and training, including students pursuing careers in healthcare professions.",
  },
  {
    title: "General Public",
    description:
      "Individuals interested in health promotion, disease prevention, and access to reliable healthcare information and resources for themselves and their families.",
  },
];

interface CoreItemProps {
  icon: IconType;
  title: string;
  description: string;
}

const CoreItem: React.FC<CoreItemProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="mx-4 my-8 flex w-80 flex-col items-center rounded-lg bg-white p-4 shadow-md sm:w-72 md:w-72">
      <Icon size={64} className="text-primary" aria-hidden />
      <p className="mt-4 text-lg font-semibold">{title}</p>
      <p className="mt-2 text-justify font-body text-sm md:text-justify">
        {description}
      </p>
    </div>
  );
};

const Page = () => {
  const reduceMotion = useReducedMotion();
  const { container, item } = serviceGridVariants(reduceMotion);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex flex-col items-center justify-center">
        <MotionSection className="flex w-full flex-col items-center justify-center bg-[#FAFAFA] py-0 md:py-10">
          <Image
            src="/images/slider-5.jpg"
            width={1200}
            height={600}
            className="mt-20 w-full sm:mt-2 md:mt-4 md:w-[70%] lg:mt-4"
            alt="Nzuri Healthcare services overview"
            priority
          />
        </MotionSection>
        <div className="flex flex-col items-center justify-center">
          {section_data.map((section, index) => (
            <MotionSection
              key={section.title}
              className="flex w-full items-center justify-center py-8"
            >
              <div className="w-[92%] items-center md:grid md:w-[80%] md:grid-cols-3">
                <h2 className="mb-3 font-title text-xl font-bold text-blue-800 md:mb-0 md:text-4xl">
                  {section.title}
                </h2>
                <p className="col-span-2 font-body leading-8 text-justify md:leading-10">
                  {section.Description}
                </p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
      <MotionSection className="bg-gray-100 py-8 text-center md:py-16">
        <h2 className="mt-2 font-title text-xl font-bold text-blue-800 md:text-4xl">
          Our Core Values
        </h2>
        <motion.div
          className="mt-8 flex flex-wrap justify-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px 0px" }}
        >
          {coreValues.map((value, index) => (
            <motion.div key={value.title} variants={item}>
              <CoreItem
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>
      <MotionSection className="py-8 text-center">
        <h2 className="mt-2 font-title text-xl font-bold text-blue-800 md:text-4xl">
          Target Audience
        </h2>
        <p className="mt-2 font-body text-sm md:text-sm lg:text-sm">
          Adults within the Ages 18 - 65
        </p>
      </MotionSection>
      <div className="flex flex-col items-center justify-center">
        {target_audience.map((section) => (
          <MotionSection
            key={section.title}
            className="my-2 flex w-full items-center justify-center"
          >
            <div className="w-[92%] items-center md:grid md:w-[80%] md:grid-cols-3">
              <h2 className="mb-3 font-title text-xl font-bold text-black md:mb-0 md:text-3xl lg:text-2xl">
                {section.title}
              </h2>
              <p className="col-span-2 font-body leading-8 text-justify md:leading-10">
                {section.description}
              </p>
            </div>
          </MotionSection>
        ))}
      </div>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Page;
