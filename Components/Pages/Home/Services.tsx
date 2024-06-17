import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceItemProps {
  imageUrl: string;
  title: string;
  description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center w-72 p-4 mx-4 my-2 bg-white rounded-lg shadow-md">
      <Image src={imageUrl} alt="Service" width={250} height={250} />
      <p className="mt-4 text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm font-body">{description}</p>
      <Link href="/care-professionals/services" className="mt-4 text-blue-500">
        Read more
      </Link>
    </div>
  );
};

const Services = () => {
  return (
    <div className="py-16 text-center">
      <h1 className="mt-2 font-bold lg:text-2xl text-blue-800 font-title ">
        Health Care Recruitment Services
      </h1>
      <p className="mt-2 lg:text-sm md:text-sm">
        One of the leading providers of domiciliary care and health care
        staffing services.
      </p>
      <div className="mt-8 flex flex-wrap justify-center">
        <ServiceItem
          imageUrl={"/images/mission.jpg"}
          title="Home care"
          description="We provide dedicated healthcare professionals who deliver personalised home care services"
        />
        <ServiceItem
          imageUrl={"/images/imge.jpg"}
          title="Personalised Care"
          description="Our Implementation is a patient-centered approach that emphasises personalised
          treatment plans."
        />
        <ServiceItem
          imageUrl={"/images/bgWork.jpg"}
          title="Companion care"
          description="Ensure your loved one receives the attention and care needed, while delivering the peace of mind."
        />
        <ServiceItem
          imageUrl={"/images/holistic.jpg"}
          title="Holistic Wellness"
          description="We offer integrated healthcare services that addresses physical, mental and emotional health"
        />
      </div>
    </div>
  );
};

export default Services;
