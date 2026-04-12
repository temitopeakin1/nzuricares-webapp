"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { RiEqualLine } from "react-icons/ri";
import { CgChevronDown, CgChevronRight, CgChevronUp } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/app/supabaseClient";

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
        name: "Our Professionals",
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
            name: "Personalised Care",
            href: "/company/services/personalised-care",
          },
          {
            name: "Infection Control and Hygiene",
            href: "/company/services/infection-control-and-hygiene",
          },
          {
            name: "Training services",
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

/** Delay before closing desktop (sub)menus so users can move cursor through gaps. */
const SUBMENU_CLOSE_DELAY_MS = 280;

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string>("");

  const navUrl = usePathname();
  const router = useRouter();
  const submenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nestedSubCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSubmenuCloseTimer = useCallback(() => {
    if (submenuCloseTimer.current) {
      clearTimeout(submenuCloseTimer.current);
      submenuCloseTimer.current = null;
    }
  }, []);

  const clearNestedSubmenuCloseTimer = useCallback(() => {
    if (nestedSubCloseTimer.current) {
      clearTimeout(nestedSubCloseTimer.current);
      nestedSubCloseTimer.current = null;
    }
  }, []);

  const scheduleCloseSubmenu = useCallback(() => {
    clearSubmenuCloseTimer();
    submenuCloseTimer.current = setTimeout(() => {
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
      clearNestedSubmenuCloseTimer();
      submenuCloseTimer.current = null;
    }, SUBMENU_CLOSE_DELAY_MS);
  }, [clearSubmenuCloseTimer, clearNestedSubmenuCloseTimer]);

  const scheduleCloseNestedSubmenu = useCallback(() => {
    clearNestedSubmenuCloseTimer();
    nestedSubCloseTimer.current = setTimeout(() => {
      setActiveSubSubMenu(null);
      nestedSubCloseTimer.current = null;
    }, SUBMENU_CLOSE_DELAY_MS);
  }, [clearNestedSubmenuCloseTimer]);

  useEffect(
    () => () => {
      clearSubmenuCloseTimer();
      clearNestedSubmenuCloseTimer();
    },
    [clearSubmenuCloseTimer, clearNestedSubmenuCloseTimer]
  );

  /* ------------------ AUTH STATE ------------------ */
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        setUsername(data.user.user_metadata?.username ?? "User");
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setUsername(session?.user?.user_metadata?.username ?? "");
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

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
    router.push("/auth/signup");
  };

  const handleLoginClick = () => {
    router.push("/auth/login");
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
              className={`relative flex flex-col items-center justify-center ${
                link.subMenus &&
                activeSubMenu === index &&
                "text-center mb-8 md:mb-0"
              }`}
              key={index}
              onMouseEnter={() => {
                if (!isMobile && link.subMenus) {
                  clearSubmenuCloseTimer();
                  clearNestedSubmenuCloseTimer();
                  setActiveSubSubMenu(null);
                  setActiveSubMenu(index);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile && link.subMenus) {
                  scheduleCloseSubmenu();
                }
              }}
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
                  className={`relative flex w-full flex-col text-center md:z-50 ${
                    isMobile
                      ? "shadow-md"
                      : "md:absolute md:left-1/2 md:top-full md:min-w-[16rem] md:-translate-x-1/2 md:pt-2"
                  }`}
                >
                  {/* Invisible hover bridge: no gap between label and panel on desktop */}
                  <div
                    className={`flex flex-col bg-white shadow-md transition-all duration-200 md:rounded-lg md:border md:border-gray-100 md:text-left md:shadow-xl ${
                      isMobile ? "w-full" : "md:w-full md:py-1"
                    }`}
                  >
                  {link.subMenus.map((item, subIndex) => {
                    const hasNested = Boolean(item.subMenus?.length);
                    const nestedOpen = activeSubSubMenu === subIndex;

                    if (hasNested) {
                      return (
                        <div
                          key={item.name}
                          className="relative"
                          onMouseEnter={() => {
                            if (!isMobile) {
                              clearNestedSubmenuCloseTimer();
                              setActiveSubSubMenu(subIndex);
                            }
                          }}
                          onMouseLeave={() => {
                            if (!isMobile) {
                              scheduleCloseNestedSubmenu();
                            }
                          }}
                        >
                          {isMobile ? (
                            <button
                              type="button"
                              className="flex w-full items-center px-4 py-2 text-left text-base font-semibold text-primary hover:bg-gray-50 hover:text-secondary"
                              aria-expanded={nestedOpen}
                              onClick={() => toggleSubSubMenu(subIndex)}
                            >
                              {item.name}
                              {nestedOpen ? (
                                <CgChevronDown className="ml-auto shrink-0 opacity-80" />
                              ) : (
                                <CgChevronRight className="ml-auto shrink-0 opacity-80" />
                              )}
                            </button>
                          ) : (
                            <div className="flex cursor-default select-none items-center px-4 py-2 text-base font-semibold text-primary">
                              <span>{item.name}</span>
                              <CgChevronDown
                                className={`ml-auto shrink-0 opacity-70 transition ${
                                  nestedOpen ? "rotate-180" : ""
                                }`}
                                aria-hidden
                              />
                            </div>
                          )}

                          {nestedOpen && item.subMenus && (
                            <div
                              className={
                                isMobile
                                  ? "flex flex-col border-l-2 border-emerald-200/80 pl-3 ml-2 mb-1"
                                  : "absolute left-full top-0 z-[60] flex pl-2"
                              }
                            >
                              {/* Desktop: horizontal hover bridge into nested panel */}
                              <div
                                className={
                                  isMobile
                                    ? "flex w-full flex-col gap-0.5"
                                    : "min-w-[14.5rem] max-w-[18rem] rounded-lg border border-gray-100 bg-white py-1 shadow-xl"
                                }
                              >
                                {item.subMenus.map((subItem) => (
                                  <Link
                                    href={subItem.href}
                                    key={subItem.name}
                                    className="block px-4 py-2 text-left text-[0.95rem] font-semibold text-primary hover:bg-emerald-50/80 hover:text-secondary md:py-2.5"
                                    onClick={() => isMobile && toggleMenu()}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-base font-semibold text-primary hover:bg-gray-50 hover:text-secondary"
                        onClick={() => isMobile && toggleMenu()}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm">
              Welcome, <b>{username}</b> 👋
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
