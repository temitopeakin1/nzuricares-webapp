"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/motion/MotionSection";

const Shifts = () => {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <MotionSection className="overflow-hidden">
      <div className="flex flex-col items-center justify-center bg-gray-100 py-32 lg:flex-row lg:px-32">
        <motion.div
          className="mx-4 w-96 rounded p-4 sm:w-72 md:w-80 lg:w-1/2 lg:pr-8"
          initial={reduceMotion ? false : { opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.06 }}
        >
          <Image
            src={"/images/shift.jpg"}
            alt={"Healthcare professional reviewing shift opportunities"}
            width={500}
            height={700}
            className="rounded-lg"
          />
        </motion.div>
        <motion.div
          className="lg:w-1/2 lg:pl-8"
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.14 }}
        >
          <h2 className="mt-2 px-4 text-center font-title text-xl font-bold md:mt-0 md:px-0 md:text-left md:text-4xl">
            Discover Shift Opportunities
          </h2>
          <p className="text-justify px-4 font-body lg:px-0 lg:text-left">
            Join our Dedicated platform to connect with nursing professionals,
            carers, and support workers seeking fulfilling shifts.
            <br /> Register now and personalize your shift preferences to explore
            availability in your area.
          </p>
          <div className="mt-4 text-center lg:text-left">
            <Link
              href="/company/staffing"
              className="mx-[-.2em] mt-1 inline-block transform rounded-full bg-gradient-to-r from-blue-900 to-green-700 px-[2em] py-[.5em] font-sans text-base text-white transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-400 md:text-xl"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
};

export default Shifts;
