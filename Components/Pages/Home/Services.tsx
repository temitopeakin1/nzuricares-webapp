import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ServicesItemProps {
  imageUrl: string;
  title: string;
  description: string;
}

const ServicesItem: React.FC<ServicesItemProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center w-80 md:w-72 sm:w-72 p-4 mx-4 bg-white rounded-lg shadow-md">
      <Image src={imageUrl} alt="Service" width={250} height={250} className="rounded-md" />
      <p className="mt-4 text-md text-[#283544] font-semibold">{title}</p>
      <p className="mt-2 text-sm font-body text-justify">{description}</p>
      <Link
        href="/healthcare-professionals/professionals"
        className="mt-4 text-blue-800 hover"
      >
        Learn more
      </Link>
    </div>
  );
};

const Services = () => {
  return (
    <div className="py-8 md:py-16 text-center">
      <h1 className="mt-2 font-bold text-xl md:text-4xl  text-blue-800 font-title ">
        Our Services
      </h1>
      <div className="mt-8 flex flex-wrap justify-center">
        <ServicesItem
          imageUrl={"/images/imge.jpg"}
          title="Registered Nurses"
          description=" Our Registered Nurses at Nzuri healthcare provides direct healthcare, Drug Administration and complete medication to individuals and Families "
        />
        <ServicesItem
          imageUrl={"/images/mission.jpg"}
          title="Carers"
          description="Our Carers provides essential personal care, support to individuals with chronic illnesses, disabilities, or aging-related needs and providing comfort"
        />
        <ServicesItem
          imageUrl={"/images/support-workers.jpg"}
          title="Support Workers"
          description="Nzuri Healthcare Support Workers assist individuals with physical, mental, or emotional needs, offering personalized care and helping with daily tasks"
        />
        <ServicesItem
          imageUrl={"/images/cleanerz.jpg"}
          title="Cleaners"
          description="Nzuri Healthcare Cleaners in healthcare environments are responsible for maintaining a safe, hygienic and sterile environment for both patients and staff. "
        />
      </div>
    </div>
  );
};

export default Services;
