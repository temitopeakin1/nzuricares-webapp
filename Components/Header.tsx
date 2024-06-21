"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { RiEqualLine } from "react-icons/ri";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
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
        name: "Services",
        href: "/healthcare-professionals/services",
      },
      {
        name: "Social Care Registration",
        href: "/healthcare-professionals/social-care-registration",
      },
    ],
  },
  {
    name: "Company",
    href: "/company",
    subMenus: [
      {
        name: "About Us",
        href: "/company/about-us",
      },
      {
        name: "Careers",
        href: "/company/careers",
      },
      {
        name: "Staffing",
        href: "/company/staffing",
      },
    ],
  },
  { name: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      className={`fixed top-0 z-50 w-full flex justify-between md:px-16 font-title ${
        isScrolled ? "p-4" : "p-2"
      } items-center bg-white`}
    >
      <Image
        src={"/images/logo.png"}
        alt={"logo"}
        height={100}
        width={130}
        className={`
          ${
            isScrolled
              ? "w-[20%] md:w-[8%] lg:w-[6%] transition-all duration-200 ease-in-out  "
              : "w-1/1 transition-all duration-200 ease-in-out"
          }
        `}
      />

      {isMobile && (
        <div className="md:hidden transition-all  ">
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
        } gap-4 md-flex `}
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
              className={`relative flex-col items-center justify-center  ${
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
                className={`text-base font-semibold text-primary  hover:font-bold  flex gap-x-2 items-center cursor-pointer  font-title hover:text-secondary px-4 py-2 ${
                  isActive && "underline font-bold text-secondary"
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
                <div className="relative md:absolute top-8 bg-white py-4 shadow-md transition-all ease-in-out duration-300 flex flex-col w-full md:w-[15em] submenu open">
                  {link.subMenus.map((item) => (
                    <Link
                      href={item.href}
                      key={item.name}
                      onClick={() => {
                        isMobile && toggleMenu();
                        toggleSubMenu(index);
                      }}
                    >
                      <p
                        className={`text-base font-semibold text-primary hover:font-bold hover:text-secondary px-4 py-2`}
                      >
                        {item.name}
                      </p>
                    </Link>
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
