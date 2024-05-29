import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const company = [
  {
    name: "About Us",
    link: "/company/about-us",
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
    name: "Services",
    link: "/staffing/services",
  },
  {
    name: "Careers",
    link: "/staffing/careers",
  },
  {
    name: "Support Workers",
    link: "/staffing/support-workers",
  },
  {
    name: "Nurses",
    link: "/staffing/nurses",
  },
];
const contacts = [
  {
    name: "Get in Touch",
    link: "/contact-us",
  },
  {
    name: "Request a Reference",
    link: "/request-a-reference",
  },
];
const Footer = () => {
  return (
    <div className="mt-8 md:mt-11 bg-footer-color md:px-16 p-4 text-black pt-14">
      <div className="flex flex-col md:flex-row pb-[6em]">
        <div className="flex-1 align-baseline">
          <Image src={"/images/logo.png"} alt="Logo" width={200} height={200} />
          <p className="mt-.5 ml-6 text-base font-pacifico">
            Your wellbeing is our priority
          </p>
        </div>
        {/* company section */}
        <div className="flex-1 flex flex-col mt-4 md:mt-0 md:ml-36 md:mr-8">
          <div>
            <p className="font-bold mb-4 text-blue-800 font-title">Company</p>
            <div className="grid grid-cols-1 font-title">
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
            <p className="font-bold mb-4 text-blue-800 font-title">Resources</p>
            <div className="grid grid-cols-1 font-title">
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
            <p className="mb-4 font-bold text-blue-800 font-title">Contact Us</p>
            {/* Add your contact information here */}
            <div className="grid grid-cols-1 font-title">
              {contacts.map((link, index) => (
                <Link key={index} href={link.link} passHref>
                  <p className="mt-2 pr-8 hover:underline cursor-pointer">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center gap-6 mt-8 -ml-2 md:mt-4">
            <button className="bg-none group hover:bg-primary rounded-full p-1 transition-all ease-in-out duration-300">
              <FaFacebookF className="text-xl group-hover:text-white" />
            </button>
            <button className="bg-none group hover:bg-primary rounded-full p-1 transition-all ease-in-out duration-300">
              <FaTwitter className="text-xl group-hover:text-white" />
            </button>
            <button className="bg-none group hover:bg-primary rounded-full p-1 transition-all ease-in-out duration-300">
              <FaLinkedinIn className="text-xl group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row">
          <Link href="/">
            <button className="text-sm text-left font-normal pr-4 md:pr-8 mb-2 md:mb-0">
              Terms and conditions
            </button>
          </Link>
          <Link href="/">
            <button className="text-sm text-left font-normal md:ml-4">
              Privacy Policy
            </button>
          </Link>
        </div>
        <p className="text-sm text-center md:text-right font-semibold mt-2 md:mt-0">
        &copy; {new Date().getFullYear()} <Link href="/">Nzurihealthcare</Link> All right reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
