"use client";

import { Header } from "@/Components";
import FadeIn from "@/Components/UI/FadeIn";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/UI/Footer";

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
  const isReverse = index % 2 === 0;
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 md:p-8 gap-[20px] md:gap-[98px] ${
        isReverse ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="flex-1 bg-[#F4F4F4] w-full flex items-center justify-center rounded-md p-4">
        <Image
          width={400}
          height={400}
          src={image}
          alt={title}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1 text-center md:text-start">
        <p className="font-bold text-[32px] md:text-[32px]">{title}</p>
        <p
          className="text-[16px] md:text-[18px]"
          dangerouslySetInnerHTML={{ __html: text }}
        ></p>
      </div>
    </div>
  );
};

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  // underline animation
  useEffect(() => {
    setTimeout(() => {
      setShowUnderline(true);
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div>
      <Header />
      <div
        className="w-full relative bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/bgSocialReg.jpg)",
          backgroundPosition: "center top -40%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-20">
          <FadeIn duration={4}>
            <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-tight mt-12 px-4 sm:px-8 md:px-16 lg:px-24 font-sans font-normal text-white relative">
              Social Care
              <br />
              <span className="relative inline-block">
                Registration
                {showUnderline && (
                  <span className="absolute left-0 bottom-0 h-2 bg-yellow-500 animate-underline"></span>
                )}
              </span>
            </h1>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div>
      </div>

      <div className="flex items-center justify-center text-2xl py-16 ">Coming Soon</div>
      <Footer />
    </div>
  );
};

export default Page;
