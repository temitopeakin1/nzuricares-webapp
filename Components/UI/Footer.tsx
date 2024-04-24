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
  }
];

const Footer = () => {
  return (
    <div className="mt-8 md:mt-11 bg-white md:px-16 p-4 text-black pt-14  ">
      <div className="flex flex-col md:flex-row pb-[6em]">
        <div className="flex-1">
          <Image src={"/logo.svg"} alt="Logo" width={100} height={100} />
          <p className="mt-4">Your Wellbeing is our priority</p>
        </div>
        <div className="flex-1 flex flex-col mt-8 md:mt-0 items-center ">
          {/* company section */}
          <h2 className="font-bold mb-4">Company</h2>
          <div className="grid grid-cols-1">
            {company.map((link, index) => (
              <Link key={index} href={link.link} passHref>
                <p className="mt-2 pr-4 hover:underline cursor-pointer">
                  {link.name}
                </p>
              </Link>
            ))}
          </div>
          {/* resources section */}
          <h2 className="font-bold mb-4">Resources</h2>
          <div className="grid grid-cols-1">
            {resources.map((link, index) => (
              <Link key={index} href={link.link} passHref>
                <p className="mt-2 pr-4 hover:underline cursor-pointer">
                  {link.name}
                </p>
              </Link>
            ))}
          </div>
          {/* contact section */}
          <h2 className="font-bold mb-4">Contacts</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
