import React from "react";
import Image from "next/image";
import Button from "@/app/components/shared/button";

const section_data = [
  { image: "/images/home-care.jpg" },
  { image: "/images/home-care2.jpg" },
  { image: "/images/shift.jpg" },
];

const Content = () => {
  return (
    <div className="py-8 flex flex-row flex-wrap md:flex-nowrap">
      <div className="m-8 md:m-24 flex flex-col items-center justify-centergap-[20px] sm:w-20px md:w-50px md:gap-[100px] rounded-md">
        <Image
          src={section_data[0].image}
          width={180}
          height={120} 
          alt="first image"
          className="mb-2 w-full bg-[#F4F4F4] sm:w-[50px] md:w-[10px] lg:w-[200px]"
          sizes="(max-width: 768px) 100vw, 33vw"
          layout="responsive" 
        />
        <Image
          src={section_data[1].image}
          width={180} 
          height={120} 
          alt="second image"
          className="w-16 sm:w-[150px] md:w-[180px] lg:w-[200px] -mt-24 md:-mt-[95px] ml-[20px] md:ml-[150px] float-right"
          layout="responsive"
        />
        <Image
          src={section_data[2].image}
          width={180}
          height={120}
          alt="third image"
          className="w-full -mt-24 md:-mt-[85px] mr-[5px] md:mr-[10px]"
          layout="responsive"
        />
      </div>

      <div className="m-8 md:m-24 items-center justify-center w-full md:w-100">
        <p className="leading-8 md:leading-10 text-justify font-body">
          <strong>Nzuri Healthcare Recruitment Limited</strong> offers
          comprehensive homecare services to ensure that individuals receive
          high-quality medical and non-medical care in the comfort of their own
          homes. Our homecare services are designed to support individuals with
          varying healthcare needs, from elderly clients to those with chronic
          illnesses or disabilities - Our homecare services includes the
          following :
        </p>
        <ul className="list-disc flex flex-col font-body font-normal text-justify leading-8 md:leading-10">
          <li>
            <strong>Personalized Care Plans:</strong> Every client’s needs are
            unique, and we create customized care plans to provide the right
            level of assistance. We consider health conditions, daily routines,
            and preferences to design the best approach for each client.
          </li>
          <li>
            <strong>Professional Healthcare Assistants(HCA):</strong> Our team
            consists of highly trained, compassionate heathcare assistants who
            are experienced in providing a range of homecare services. Whether
            it’s assistance with daily activities, medication management, or
            specialized medical care, our staff are equipped to provide the best
            support.
          </li>
          <li>
            <strong>24/7 Availability:</strong> Nzuri Healthcare Recruitment
            offers flexible care options to fit the needs of the client. Whether
            you need care on a full-time, part-time, or emergency basis, our
            Healthcare Assistants are available around the clock.
          </li>
        </ul>
        <div className="flex justify-center mt-4 md:mt-8">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Content;
