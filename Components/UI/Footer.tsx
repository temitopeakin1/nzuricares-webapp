import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaPhone, FaTwitter } from "react-icons/fa";

const company = [
  {
    name: "About Us",
    link: "/company/about-us",
  },
  {
    name: "How It works",
    link: "/healthcare-professionals/how-it-works",
  },
  {
    name: "Staffing",
    link: "/company/staffing",
  },
  {
    name: "Register your interest",
    link: "/clients/register-interest" 
  },
];
const resources = [
  { name: "Home Care", link: "/company/services/home-care" },
  {
    name: "Personalized Care",
    link: "/company/services/personalized-care",
  },
  {
    name: "Infection Control and Hygiene",
    link: "/company/services/infection-control-and-hygiene",
  },
  {
    name: "Training",
    link: "/company/services/training",
  },
  {
    name: "Careers",
    link: "/company/careers",
  },
];
const contacts = [
  {
    name: "Get in Touch",
    link: "/contact",
  },
  {
    name: "Request a Reference",
    link: "/request-reference",
  },
];
const Footer = () => {
  return (
    <div className="mt-8 md:mt-11 bg-footer-color md:px-16 p-4 pt-14">
      <div className="flex flex-col md:flex-row pb-[6em] text-black text-sm ">
        <div className="flex-1 align-baseline ml-[-1.5rem] mt-[-2rem] md:mt-[-1.5rem] md:ml-8">
          <Image src={"/images/logo.png"} alt="Logo" width={200} height={200} />
        </div>
        {/* company section */}
        <div className="flex-1 flex flex-col mt-4 md:mt-0 md:ml-36 md:mr-8">
          <div>
            <p className="font-bold text-blue-800 font-title">Company</p>
            <div className="grid grid-cols-1 font-title">
              {company.map((link, index) => (
                <Link key={index} href={link.link} passHref>
                  <p className="mt-2 hover:underline cursor-pointer">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* resources section */}
        <div className="flex-1 flex flex-col mt-4 mb md:mt-0 md:ml-8 md:mr-8">
          <div>
            <p className="font-bold text-blue-800 font-title">Resources</p>
            <div className="grid grid-cols-1 font-title">
              {resources.map((link, index) => (
                <Link key={index} href={link.link} passHref>
                  <p className="mt-2 hover:underline cursor-pointer">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* contact section */}
        <div className="flex-1 flex flex-col mt-4 md:mt-0 md:ml-20 md:mr-8">
          <div>
            <p className=" font-bold text-blue-800 font-title">
              Contact Us
            </p>
            {/* Add your contact information here */}
            <div className="grid grid-cols-1 font-title">
              {contacts.map((link, index) => (
                <Link key={index} href={link.link} passHref>
                  <p className="mt-2 hover:underline cursor-pointer">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center gap-6 mt-8 -ml-2 md:mt-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-none group hover:bg-primary rounded-full p-1 transition-all ease-in-out duration-300"
            >
              <FaFacebookF className="text-xl group-hover:text-white" />
            </a>
            <a
              href="https://twitter.com/your-twitter-page"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-none group hover:bg-primary rounded-full p-1 transition-all ease-in-out duration-300"
            >
              <FaTwitter className="text-xl group-hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/company/nzuri-healthcare-recruitment-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-none group hover:bg-primary rounded-full p-1 transition-all ease-in-out duration-300"
            >
              <FaLinkedinIn className="text-xl group-hover:text-white" />
            </a>
            <a
              href="tel:02080502662"
              className="bg-none group hover:bg-primary rounded-full p-1 transition-all ease-in-out duration-300"
            >
              <FaPhone className="text-xl group-hover:text-white" />
            </a>
          </div>
          {/* <div className="flex mt-2 items-center">
            <RiCellphoneFill className="text-xl mr-2" /> 
            <span className="font-title">02080502662</span>
          </div> */}
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row">
          <Link href="/terms-and-conditions">
            <button className="text-sm text-left font-normal pr-4 md:pr-8 mb-2 md:mb-0">
              Terms and conditions
            </button>
          </Link>
          <Link href="/privacy-policy">
            <button className="text-sm text-left font-normal md:ml-4">
              Privacy Policy
            </button>
          </Link>
        </div>
        <p className="text-sm text-center md:text-right font-semibold mt-2 md:mt-0">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/">Nzuri Healthcare Recruitment Limited</Link> All right
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
