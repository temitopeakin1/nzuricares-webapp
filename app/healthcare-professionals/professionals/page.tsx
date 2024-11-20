import React from "react";
import Image from "next/image";
import { Header } from "@/Components";
import Footer from "@/Components/UI/Footer";

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
      <div className="flex-1">
        <p className="font-bold text-[#283544] text-[32px] md:text-[48px] text-center md:text-justify leading-none">
          {title}
        </p>
        <p className=" text-[16px] md:text-[18px] text-justify md:text-justify mt-2 px-4 sm:px-0 md:px-0">
          {text}
        </p>
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
          {/* <div className="text-blue-800 pt-24 sm:pt-28 md:pt-28 lg:pt-32 xl:pt-36 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-title">
            <p className="text-base ">Nzuricare Services</p>
            <hr className="my-2 h-1 bg-primary" />
            <p className="text-2xl md:text-5xl font-bold uppercase">
              Our Services
            </p>
          </div> */}
          <Image
            src={"/images/slider-1.jpg"}
            width={400}
            height={400}
            className="w-full md:w-[70%] mt-20 sm:mt-2 md:mt-4 lg:mt-4"
            alt="services"
          />
        </div>

        <div className=" flex flex-col gap-6 items-center justify-center py-0 md:py-20 w-full md:w-[50%]">
          {/* <div className="border-t-primary border-b-primary border-t-2 border-b-2 p-4 md:p-6"> */}
          <p className=" regular text-xl font-semibold items-center justify-center text-justify md:text-justify p-8 md:p-8 ">
            At Nzuri HealthCare, we believe that exceptional care begins with a
            compassionate heart and a professional touch. Our dedicated team of
            carers is committed to providing personalised, high-quality care
            that enhances the quality of life for you and your loved ones.
            Whether its assistance with daily activities, specialized medical
            care, or simply a friendly companion, we are here to support you
            every step of the way. Our professional carers, Nurses, and Support
            Workers are here to provide the compassionate, reliable assistance
            that makes a meaningful difference in your life.
          </p>
          {/* </div> */}
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
