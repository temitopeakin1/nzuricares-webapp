import React from "react";
import Image from "next/image";
import { Header } from "@/Components";
import Footer from "@/Components/UI/Footer";
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
import { Description } from "@headlessui/react";
import Subscribe from "@/Components/UI/Subscribe";

const section_data = [
  {
    title: "About Nzuricares",
    Description:
      "We are a Leading Care Provider Recruitment firm, We provide accessible, high-quality healthcare services that promote wellness, empower individuals, and enhance the quality of life for all members of our community",
  },
  {
    title: "Our Mission",
    Description:
      "To provide accessible, high-quality healthcare services that promote wellness, empower individuals, and enhance the quality of life for all members of our community",
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
      "We believe in working closely with patients, families, caregivers, and healthcare professionals to achieve the best possible outcomes through teamwork and cooperation",
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
    title:"Patients",
    description:
      "Individuals seeking medical care, treatment, and support for various health concerns, illnesses, and conditions.",
  },
  {
    title: "Families and Caregivers",
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
  title: string
  description: string;
}

const CoreItem: React.FC<CoreItemProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center w-72 p-4 mx-4 my-2 bg-white rounded-lg shadow-md">
      <Icon size={64} className="text-primary" />
      <p className="mt-4 text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm font-body">{description}</p>
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#FAFAFA] flex flex-col items-center justify-center py-0 md:py-10 w-full">
        <div className="text-blue-800 pt-24 sm:pt-28 md:pt-28 lg:pt-32 xl:pt-36 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-title">
            <p className="text-base">About Nzuri Healthcare</p>
            <hr className="my-2 h-1 bg-primary" />
            <p className="text-2xl md:text-5xl font-bold uppercase">About Us</p>
          </div>
          <Image
            src="/images/bgSlider-5.jpg"
            width={400}
            height={400}
            className="w-full md:w-[70%] mt-8 rounded-sm"
            alt="services"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          {section_data.map((section, index) => (
            <div key={index} className="flex items-center justify-center py-8">
              <div className="w-[92%] md:w-[80%] md:grid grid-cols-3 items-center">
                <h1 className="text-blue-800 font-bold lg:text-2xl md:text-3xl mb-3 md:mb-0 font-title">
                  {section.title}
                </h1>
                <p className="leading-8 md:leading-10 text-justify col-span-2 font-body">
                  {section.Description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-16 text-center bg-gray-100">
        <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
          Our Core Values
        </h1>
        <div className="mt-8 flex flex-wrap justify-center">
          {coreValues.map((value, index) => (
            <CoreItem
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
      <div className="py-8 text-center">
        <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title">
          Target Audience
        </h1>
        <p className="mt-2 lg:text-sm md:text-sm">
        Adults within the Ages 18 - 65
      </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        {target_audience.map((section, index) => (
          <div key={index} className="flex items-center justify-center my-2">
            <div className="w-[92%] md:w-[80%] md:grid grid-cols-3 items-center">
              <h1 className="text-black font-bold lg:text-2xl md:text-3xl mb-3 md:mb-0 font-title">
                {section.title}
              </h1>
              <p className="leading-8 md:leading-10 text-justify col-span-2 font-body">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Page;


