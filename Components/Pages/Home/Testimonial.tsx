"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";

interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
}

export default function Testimonial({}: { testimonials: Testimonial[] }) {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming: number = 7000;

  const testimonials: Testimonial[] = [
    {
      image: "/images/user-7.jpg",
      quote:
        "I want to extend my heartfelt thanks to the entire team at Nzuri Healthcare. The care workers have been a lifeline for me during a challenging time. Their kindness, patience, and genuine care have made all the difference. I am grateful for their dedication and the positive impact they have had on my wellbeing.",
      name: "John Doe",
      role: "Exec",
    },
    {
      image: "/images/avatar-4.jpg",
      quote:
        "I highly recommend Nzuri Healthcare to anyone in need of care services. From the initial consultation to the ongoing support, the team has been exceptional. The care workers are not only skilled and experienced but also compassionate and understanding. They have truly made a positive impact on my life.",
      name: "Donald .T.",
      role: "Founder",
    },
    {
      image: "/images/avatar-2.jpg",
      quote:
        "I cannot thank Nzuri Healthcare enough for the outstanding care provided to my elderly parents. The care workers have gone above and beyond to ensure my parents' comfort and safety. They treat them with dignity and respect, and I have complete peace of mind knowing they are in good hands. I wholeheartedly recommend Nzuri Healthcare to anyone seeking compassionate and reliable care services",
      name: "Hendrick Hilton",
      role: "Excecutive",
    },
    {
      image: "/images/user-10.jpg",
      quote:
        "Choosing Nzuri Healthcare was one of the best decisions I've made for my family. The care workers provided by the agency have become like family to us. They not only assist with daily tasks but also provide companionship and emotional support. I am impressed by their professionalism and commitment to excellence.",
      name: "Theresa Doe",
      role: "Lead",
    },
  ];

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === testimonials.length ? 0 : (active) => active + 1
      );
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate, testimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <div className="py-16 text-center w-full max-w-3xl mx-auto">
      <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
        Testimonials
      </h1>
      <p className="mt-2 lg:text-sm md:text-sm px-4 md:px-0 sm:px-0 font-satoshi">
        Read what our valued clients are saying about us
      </p>
      {/* Testimonial image */}
      <div className="relative h-40 mt-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-indigo-500/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
          <div className="h-16 -mt-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-slide">
                <Transition
                  show={active === index}
                  enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                  enterFrom="opacity-0 -rotate-[60deg]"
                  enterTo="opacity-100 rotate-0"
                  leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                  leaveFrom="opacity-100 rotate-0"
                  leaveTo="opacity-0 rotate-[60deg]"
                >
                  <Image
                    className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                    src={testimonial.image}
                    width={100}
                    height={100}
                    alt={testimonial.name}
                  />
                </Transition>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="mb-9 transition-all duration-150 delay-300 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              beforeEnter={() => heightFix()}
            >
              <div className="text-sm sm:text-base md:text-lg px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 font-semibold before:content-['\201C'] after:content-['\201D']">
                {testimonial.quote}
              </div>
            </Transition>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-wrap justify-center -m-1.5">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ${
              active === index
                ? "bg-primary text-white shadow-indigo-950/10"
                : "bg-white hover:bg-indigo-100 text-slate-900"
            }`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span>{testimonial.name}</span>{" "}
            <span
              className={`${
                active === index ? "text-indigo-200" : "text-slate-300"
              }`}
            >
              -
            </span>{" "}
            <span>{testimonial.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
