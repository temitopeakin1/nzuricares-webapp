import React from "react";
import Image from "next/image";
import Link from "next/link";

const company = [
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "How It works",
    link: "/care-professionals/how-it-works",
  },
  {
    name: "Care workers",
    link: "/staffing/care-workers",
  },
];
const resources = [
  {
    name: "Care workers",
    link: "/staffing/care-workers",
  },
  {
    name: "Care workers",
    link: "/staffing/care-workers",
  },
  {
    name: "Care workers",
    link: "/staffing/care-workers",
  },
  {
    name: "Care workers",
    link: "/staffing/care-workers",
  },
];

const Footer = () => {
  return (
    <div className="mt-8 md:mt-11 bg-footer-color md:px-16 p-4 text-black pt-14">
      <div className="flex flex-col md:flex-row pb-[12em] -mt-2">
        <div className="flex-1 align-baseline">
          <Image src={"/images/logo.png"} alt="Logo" width={200} height={200} />
          <p className="mt-1 px-4 text-base font-semibold">
            Your Wellbeing is our priority
          </p>
        </div>
        {/* company section */}
        <div className="flex-1 flex flex-col mt-4 md:mt-0 md:ml-36 md:mr-8">
          <div>
            <p className="font-bold mb-4">Company</p>
            <div className="grid grid-cols-1">
              {company.map((link, index) => (
                <Link key={index} href={link.link} passHref>
                  <p className="mt-2 pr-4 hover:underline cursor-pointer">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* resources section */}
        <div className="flex-1 flex flex-col mt-4 md:mt-0 md:ml-8 md:mr-8">
          <div>
            <p className="font-bold mb-4">Resources</p>
            <div className="grid grid-cols-1">
              {resources.map((link, index) => (
                <Link key={index} href={link.link} passHref>
                  <p className="mt-2 pr-8 hover:underline cursor-pointer">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* contact section */}
        <div className="flex-1 flex flex-col mt-4 md:mt-0 md:ml-8 md:mr-8">
          <div>
            <p className="font-bold mb-4">Contacts</p>
            {/* Add your contact information here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
