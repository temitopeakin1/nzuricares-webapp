"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/motion/MotionSection";
import { serviceGridVariants } from "@/components/motion/home-variants";

interface ServicesItemProps {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
}

const ServicesItem: React.FC<ServicesItemProps> = ({
  imageUrl,
  title,
  description,
  linkUrl,
}) => {
  return (
    <div className="mx-4 flex w-80 flex-col items-center rounded-lg bg-white p-4 shadow-md sm:w-72 md:w-72">
      <Image
        src={imageUrl}
        alt={title}
        width={250}
        height={250}
        className="rounded-md"
      />
      <p className="mt-4 text-md font-semibold text-[#283544]">{title}</p>
      <p className="mt-2 text-justify font-body text-sm">{description}</p>
      <Link href={linkUrl} className="mt-4 text-blue-800 hover:underline">
        Learn more
      </Link>
    </div>
  );
};

const Services = () => {
  const reduceMotion = useReducedMotion();
  const { container, item } = serviceGridVariants(reduceMotion);

  const items = [
    {
      imageUrl: "/images/home-care.jpg",
      title: "Home Care",
      description:
        "We Provide healthcare professionals for in-home care services, helping individuals maintain independence and comfort in their own environment. We match your needs with qualified healthcare assistants",
      linkUrl: "/company/services/home-care",
    },
    {
      imageUrl: "/images/home-care2.jpg",
      title: "Personalized Care",
      description:
        "Our platform connects healthcare providers who offer customized care plans tailored to each patient’s unique medical needs, we ensure the right fit for every individuals needing our services",
      linkUrl: "/company/services/personalised-care",
    },
    {
      imageUrl: "/images/support-workers.jpg",
      title: "infection Control and Hygiene",
      description:
        "With a focus on patient safety and wellness, we make provision for healthcare professionals skilled in infection control and maintaining stringent hygiene protocols be it in healthcare facilities, communities",
      linkUrl: "/company/services/infection-control-and-hygiene",
    },
    {
      imageUrl: "/images/training-services.jpg",
      title: "Training Services",
      description:
        "We provide comprehensive training services to healthcare professionals, covering essential skills from patient care to compliance with healthcare standards, in collaboration with top training providers",
      linkUrl: "/company/services/training",
    },
  ] as const;

  return (
    <MotionSection className="py-8 text-center md:py-16">
      <h2 className="mt-2 font-title text-xl font-bold text-blue-800 md:text-4xl">
        Our Services
      </h2>
      <motion.div
        className="mt-8 flex flex-wrap justify-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px 0px" }}
      >
        {items.map((row) => (
          <motion.div key={row.title} variants={item}>
            <ServicesItem
              imageUrl={row.imageUrl}
              title={row.title}
              description={row.description}
              linkUrl={row.linkUrl}
            />
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
};

export default Services;
