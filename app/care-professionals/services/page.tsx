import React from "react";
import Image from "next/image";
import { Header } from "@/Components";
import Footer from "@/Components/UI/Footer";

const section_data = [
  {
    title: "Home Health Care",
    text: "Combining more traditional approaches to service operations such as ITIL with more iterative approaches such as properly empowered WebOps and flexible provisioning and service platforms, our teams continually look for the most appropriate and efficient approach to providing operational services. Across our clients, we have experience of designing and implementing efficient and repeatable Incident management, request fulfilment, problem management, application management and IT operations control capabilities.",
    image: "/images/service-1.jpg",
  },
  {
    title: "Personalized Care",
    text: "Our Implementation is a patient-centered approach that emphasizes personalized treatment plans.",
    image: "/images/service-2.jpg",
  },
  {
    title: "Companion Care",
    text: "Ensure your loved one receives the attention and care needed, while delivering the peace of mind.",
    image: "/images/service-3.jpg",
  },
  {
    title: "Holistic Wellness",
    text: "At Nzuricares we offer integrated healthcare services that address not only physical health but also mental, emotional, and social well-being, promoting a holistic approach to health and wellness.",
    image: "/images/service-4.jpg",
  },
];

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
  const isReverse = index % 2 === 0;
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 md:p-8 gap-[20px] md:gap-[98px] ${
        isReverse ? " md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex-1 bg-[#F4F4F4] w-full flex items-center justify-center rounded-md p-4 ">
        <Image
          width={200}
          height={200}
          src={image}
          alt={title}
          className="h-full w-full"
          layout="responsive"
        />
      </div>
      <div className="flex-1 text-center md:text-start ">
        <p className="font-bold text-[32px] md:text-[48px]">{title}</p>
        <p className=" text-[16px] md:text-[18px] ">{text}</p>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#FAFAFA] flex flex-col items-center justify-center py-0 md:py-10 w-full">
          <div className="text-blue-800 pt-16 text-xl font-bold font-title">
            <p className="text-base ">Nzuricare Services</p>
            <hr className="my-2 h-1 bg-primary" />
            <p className="text-2xl md:text-5xl font-bold uppercase">
              Our Services
            </p>
          </div>
          <Image
            src={"/images/bgSlider-5.jpg"}
            width={400}
            height={400}
            className="w-full md:w-[70%] mt-8 rounded-sm"
            alt="services"
          />
        </div>

        <div className=" flex flex-col gap-6 items-center justify-center py-0 md:py-10 w-full md:w-[50%]">
          <div className="border-t-primary border-b-primary border-t-2 border-b-2 p-4 md:p-6">
            <p className="text-xl font-bold text-justify md:text-start ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="flex item-center justify-center mt-12">
          <div className="w-full md:w-[80%]">
            {section_data.map((item, index) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default page;
