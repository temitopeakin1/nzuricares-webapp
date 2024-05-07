import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceItemProps {
  imageUrl: string;
  title: string;
  description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="flex flex-col items-center w-72 p-4 mx-4 my-2 bg-white rounded-lg shadow-md">
      <Image src={imageUrl} alt="Service" width={250} height={250} />
      <p className="mt-4 text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm">{description}</p>
      <Link href="/read-more" className="mt-4 text-blue-500">
        Read more
      </Link>
    </div>
  );
};

const Services = () => {
  return (
    <div className="py-24 text-center" >
      <h1 className="mt-8 font-medium lg:text-3xl text-blue-800 ">Health Care Services</h1>
      <p className="mt-4 lg:text-sm md:text-xs">
        We are one of the leading providers of domiciliary care and health care
        staffing services.
      </p>
      <div className="mt-8 flex flex-wrap justify-center">
        <ServiceItem
          imageUrl={"/images/service-1.jpg"}
          title="Home health care"
          description="Patients realize that their illness restricts activity in their daily lives, making living alone too difficult."
        />
        <ServiceItem
          imageUrl={"/images/service-2.jpg"}
          title="Pediatric"
          description="Children receive the necessary assistance they need at home to have a safe, healthy, and happy childhood."
        />
        <ServiceItem
          imageUrl={"/images/service-3.jpg"}
          title="Companion care"
          description="Ensure your loved one receives the attention and care needed, while delivering the peace of mind."
        />
        <ServiceItem
          imageUrl={"/images/service-4.jpg"}
          title="Conditions treated"
          description="Patients with a variety of conditions including disease, cancer, neurological and respiratory disorders and more."
        />
      </div>
    </div>
  );
};

export default Services;
