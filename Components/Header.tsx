"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { RiEqualLine } from "react-icons/ri";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineCancel } from "react-icons/md";
import Signup from "./Signup";
import Page from "@/app/(auth)/login/page";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Care Professionals",
    href: "/care-professionals",
    subMenus: [
      {
        name: "How it works",
        href: "/care-professionals/how-it-works",
      },
      {
        name: "Services",
        href: "/care-professionals/services",
      },
      {
        name: "Social Care Registration",
        href: "/care-professionals/social-care-registration",
      },
    ],
  },
  {
    name: "Staffing",
    href: "/staffing",
    subMenus: [
      {
        name: "Careers",
        href: "/staffing/careers",
      },
      {
        name: "Care workers",
        href: "/staffing/care-workers",
      },
      {
        name: "Nurses",
        href: "/staffing/nurses",
      },
      {
        name: "Support Workers",
        href: "/staffing/support-workers",
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
  const [isModalVisible, setModalVisible] = useState(false);
  // const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);

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
  // toggle modal for signup button
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const handleSignUpSuccess =() => {
  //   setIsSignupSuccessful(isSignupSuccessful)
  // }

  return (
    <div
      className={`fixed top-0 z-50 w-full flex justify-between md:px-16 ${
        isScrolled ? "p-4" : "p-2"
      } items-center bg-white`}
    >
      <Image
        src={"/images/logo.png"}
        alt={"logo"}
        height={250}
        width={200}
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
            ? "absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col gap-4 justify-center items-center"
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
                className={`text-base font-semibold text-primary  hover:font-bold  flex gap-x-2 items-center cursor-pointer   hover:text-secondary px-4 py-2 ${
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
        {/* Styling for the Signup button */}

        <button
          onClick={toggleModal}
          className="bg-primary text-white px-4 py-2 rounded-full"
        >
          Sign Up
        </button>
      </div>
      {/* Conditionally render the Signup modal */}
      {/* {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          {isSignupSuccessful ? (
            <Page /> // Render Login component on successful signup
          ) : (
            <Signup onSignUpSuccess={handleSignUpSuccess} onCancel={toggleModal} /> // Render Signup component otherwise
          )}
        </div>
      )} */}
       {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Signup onCancel={toggleModal}/>
          <button
            onClick={toggleModal}
            className="relative right-8 rounded-full"
          >
            <MdOutlineCancel className="text-xl -mt-72" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
