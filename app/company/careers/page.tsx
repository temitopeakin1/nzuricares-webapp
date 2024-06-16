"use client";

import { Header } from "@/Components";
import FadeIn from "@/Components/UI/FadeIn";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/UI/Footer";
import Link from "next/link";

const careers = [
  {
    title: "Mission",
    image: "/images/service-1.jpg",
    text: "We are on a mission to revolutionize the health and care industry in the UK and beyond, <br /> equipping staff with the tools, opportunities, and transparency they need to excel, one shift at a time.<br /> We believe that our strength lies in the diversity of our skills, experiences, and talents. As we empower care teams, we are equally committed to fostering a collaborative, respectful, and inclusive environment for our colleagues.Become part of a purpose-driven health tech company and join us in making a meaningful impact.",
  },
  {
    title: "Diversity and Inclusion",
    image: "/images/service-2.jpg",
    text: "Diversity and inclusion are fundamental principles in our caregivers agency. We believe that by embracing a wide range of backgrounds, perspectives, and experiences, we can provide more compassionate, effective, and personalised care to our clients. ",
  },
  {
    title: "Careers",
    image: "/images/service-2.jpg",
    text: "In our agency, we have a diverse team of professionals fulfilling various roles to ensure comprehensive care and support for our clients. Our team includes Carers / Caregivers, Registered Nurses, administrative support staff, and support health workers, among others. Each member of our team plays a crucial role in delivering high-quality care services and maintaining the well-being of our clients.",
  },
];

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

  // for the underline animation on text
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
          backgroundImage: "url(/images/caregiver.jpg)",
          backgroundPosition: "center top -10%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-50">
          <FadeIn duration={4}>
            <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-tight mt-12 px-4 sm:px-8 md:px-16 lg:px-24 font-sans font-normal text-white relative">
              Careers at
              <br />
              <span className="relative inline-block">
                Nzuri Healthcare
                {showUnderline && (
                  <span className="absolute left-0 bottom-0 h-2 bg-yellow-500 animate-underline"></span>
                )}
              </span>
            </h1>
            <Link href={"/company/careers/#"} passHref>
              <button className="mt-8 px-[2em] py-[.5em] mx-24 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans">
                Open roles
              </button>
            </Link>
          </FadeIn>
        </div>
        <div className="h-[80vh]"></div>
      </div>

      <div className="flex items-center justify-center mt-12">
        <div className="w-full md:w-[80%]">
          {careers.map((item, index) => (
            <Section
              key={item?.title}
              title={item?.title}
              text={item?.text}
              image={item?.image}
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
