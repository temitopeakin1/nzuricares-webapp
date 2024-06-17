import React from "react";
import Image from "next/image";
import { Header } from "@/Components";
import Footer from "@/Components/UI/Footer";

const section_data = [
  {
    title: "Home Care",
    text: "We offer compassionate and dedicated healthcare professionals who deliver personalised home care services. Our team addresses complex clinical needs and provides practical support to foster independence and enhance quality of life.",
    image: "/images/mission.jpg",
  },
  {
    title: "Personalised Care",
    text: "Our Implementation is a patient-centered approach that emphasises personalised treatment plans.",
    image: "/images/imge.jpg",
  },
  {
    title: "Companion Care",
    text: "Ensure your loved one receives the attention and care needed, while delivering the peace of mind.",
    image: "/images/bgWork.jpg",
  },
  {
    title: "Holistic Wellness",
    text: "At Nzuricares we offer integrated healthcare services that address not only physical health but also mental, emotional, and social well-being, promoting a holistic approach to health and wellness.",
    image: "/images/holistic.jpg",
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
          <div className="text-blue-800 pt-24 sm:pt-28 md:pt-28 lg:pt-32 xl:pt-36 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-title">
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
            <p className="text-xl font-semibold text-justify md:text-start ">
              At Nzuri HealthCare, we believe that exceptional care begins with
              a compassionate heart and a professional touch. Our dedicated team
              of carers is committed to providing personalised, high-quality
              care that enhances the quality of life for you and your loved
              ones. Whether its assistance with daily activities, specialized
              medical care, or simply a friendly companion, we are here to
              support you every step of the way. Our professional carers,
              Nurses, and Support Workers are here to provide the compassionate,
              reliable assistance that makes a meaningful difference in your
              life. Explore our services and let us be your trusted partner in
              care.
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
