"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { RiEqualLine } from "react-icons/ri";
import { CgChevronDown, CgChevronRight, CgChevronUp } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Healthcare Professionals",
    href: "/healthcare-professionals",
    subMenus: [
      {
        name: "How it works",
        href: "/healthcare-professionals/how-it-works",
      },
      {
        name: "Professionals",
        href: "/healthcare-professionals/professionals",
      },
    ],
  },
  {
    name: "Clients",
    href: "",
    subMenus: [
      {
        name: "Register Interest",
        href: "/clients/register-interest",
      },
    ],
  },
  {
    name: "Company",
    href: "/company",
    subMenus: [
      {
        name: "Services",
        href: "",
        subMenus: [
          { name: "Home Care", href: "/company/services/home-care" },
          {
            name: "Personalized Care",
            href: "/company/services/personalized-care",
          },
          {
            name: "Infection Control and Hygiene",
            href: "/company/services/infection-control-and-hygiene",
          },
          {
            name: "Training",
            href: "/company/services/training",
          },
        ],
      },
      { name: "About Us", href: "/company/about-us" },
      { name: "Careers", href: "/company/careers" },
      { name: "Staffing", href: "/company/staffing" },
    ],
  },
  { name: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<number | null>(null);

  const navUrl = usePathname();
  const router = useRouter();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollThreshold = 100;
    setIsScrolled(scrollTop > scrollThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSubMenu = (index: number) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const toggleSubSubMenu = (index: number) => {
    setActiveSubSubMenu(activeSubSubMenu === index ? null : index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div
      className={`fixed top-0 z-50 w-full flex justify-between md:px-16 font-title text-12 ${
        isScrolled ? "p-4" : "p-2"
      } items-center bg-white`}
    >
      <Link href="/">
        <Image
          src={"/images/logo.png"}
          alt={"logo"}
          height={100}
          width={130}
          className={`${
            isScrolled
              ? "w-[20%] md:w-[40%] lg:w-[40%] transition-all duration-200 ease-in-out"
              : "w-1/1 transition-all duration-200 ease-in-out"
          }`}
        />
      </Link>

      {isMobile && (
        <div className="md:hidden transition-all">
          <button onClick={toggleMenu} className="pr-1">
            <RiEqualLine
              className={`text-[2em] ${
                isMenuOpen ? "animate-bounce duration-300" : ""
              }`}
            />
          </button>
        </div>
      )}

      <div
        className={`${
          isMenuOpen
            ? "absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col gap-4 justify-center items-center font-title"
            : "md:flex hidden"
        } gap-4 md:flex items-center justify-center`}
      >
        <button
          onClick={toggleMenu}
          className="p-1 inline md:hidden absolute top-4 right-4"
        >
          <AiOutlineClose
            className={`text-[2em] ${
              isMenuOpen ? "animate-bounce duration-300" : ""
            }`}
          />
        </button>

        {navigation.map((link, index) => {
          const isActive =
            (link.href === "/" && navUrl === "/") ||
            (link.href !== "/" && navUrl.includes(link.href));

          return (
            <div
              className={`relative flex-col items-center justify-center ${
                link.subMenus &&
                activeSubMenu === index &&
                "text-center mb-8 md:mb-0"
              }`}
              key={index}
            >
              <div
                onClick={() => {
                  if (!link.subMenus) router.push(link.href);
                  link.subMenus ? toggleSubMenu(index) : setIsMenuOpen(false);
                }}
                className={`text-base font-semibold text-primary hover:font-bold flex gap-x-2 items-center cursor-pointer font-title hover:text-secondary px-4 py-2 ${
                  isActive && " font-bold text-secondary"
                }`}
              >
                <span>{link.name}</span>
                {link.subMenus && (
                  <>
                    {activeSubMenu === index ? (
                      <CgChevronUp />
                    ) : (
                      <CgChevronDown />
                    )}
                  </>
                )}
              </div>

              {link.subMenus && activeSubMenu === index && (
                <div
                  className={`relative ${
                    isMobile ? "flex flex-col w-full" : "md:absolute top-8"
                  } bg-white shadow-md transition-all flex flex-col w-full md:w-[15em] text-center duration-300`}
                >
                  {link.subMenus.map((item, subIndex) => (
                    <div key={item.name} className="relative group">
                      <Link
                        href={item.href}
                        className="flex items-center text-base font-semibold text-primary hover:text-secondary px-4 py-2"
                        onClick={() =>
                          item.subMenus
                            ? toggleSubSubMenu(subIndex)
                            : isMobile && toggleMenu()
                        }
                      >
                        {item.name}
                        {item.subMenus && (
                          <>
                            {activeSubSubMenu === subIndex ? (
                              <CgChevronDown className="ml-auto" />
                            ) : (
                              <CgChevronRight className="ml-auto" />
                            )}
                          </>
                        )}
                      </Link>

                      {item.subMenus && activeSubSubMenu === subIndex && (
                        <div
                          className={`${
                            isMobile
                              ? "pl-6 flex flex-col"
                              : "absolute left-full top-0 w-[15em] bg-white shadow-md py-2 flex flex-col text-center"
                          } bg-white shadow-md py-2`}
                        >
                          {item.subMenus.map((subItem) => (
                            <Link
                              href={subItem.href}
                              key={subItem.name}
                              className="text-base text-primary text-center font-semibold hover:text-secondary px-4 py-2"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={handleLoginClick}
          className="bg-transparent border font-semibold border-primary text-primary px-4 py-2 rounded-full"
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="bg-primary text-white px-4 py-2 bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 rounded-full"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
