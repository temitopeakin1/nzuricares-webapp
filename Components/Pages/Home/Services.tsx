import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ServicesItemProps {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
}

const ServicesItem: React.FC<ServicesItemProps> = ({
  imageUrl,
  title,
  description,
  linkUrl,
}) => {
  return (
    <div className="flex flex-col items-center w-80 md:w-72 sm:w-72 p-4 mx-4 bg-white rounded-lg shadow-md">
      <Image
        src={imageUrl}
        alt="Service"
        width={250}
        height={250}
        className="rounded-md"
      />
      <p className="mt-4 text-md text-[#283544] font-semibold">{title}</p>
      <p className="mt-2 text-sm font-body text-justify">{description}</p>
      <Link href={linkUrl} className="mt-4 text-blue-800 hover">
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
          imageUrl={"/images/home-care.jpg"}
          title="Home Care"
          description="We Provide healthcare professionals for in-home care services, helping individuals maintain independence and comfort in their own environment. We match your needs with qualified healthcare assistants"
          linkUrl="/company/services/home-care"
        />
        <ServicesItem
          imageUrl={"/images/home-care2.jpg"}
          title="Personalized Care"
          description="Our platform connects healthcare providers who offer customized care plans tailored to each patient’s unique medical needs, we ensure the right fit for every individuals needing our services"
          linkUrl="/company/services/personalized-care"
        />
        <ServicesItem
          imageUrl={"/images/support-workers.jpg"}
          title="infection Control and Hygiene"
          description="With a focus on patient safety and wellness, we make provision for healthcare professionals skilled in infection control and maintaining stringent hygiene protocols be it in healthcare facilities, communities"
          linkUrl="/company/services/infection-control-and-hygiene"
        />
        <ServicesItem
          imageUrl={"/images/training-services.jpg"}
          title="Training Services"
          description="We provide comprehensive training services to healthcare professionals, covering essential skills from patient care to compliance with healthcare standards, in collaboration with top training providers"
          linkUrl="/company/services/training"
        />
      </div>
    </div>
  );
};

export default Services;
