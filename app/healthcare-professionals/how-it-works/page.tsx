"use client";

import Accordion from "@/components/ui/Accordion";
import FadeIn from "@/components/ui/FadeIn";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useSupabaseBrowser } from "@/lib/supabase-browser";
import {
  HiArrowRightOnRectangle,
  HiClipboardDocumentCheck,
  HiEnvelopeOpen,
  HiUserPlus,
} from "react-icons/hi2";

const accordion_data = [
  {
    title: "What is Nzuri healthcare about",
    detail:
      "Nzuri Healthcare is dedicated to providing exceptional healthcare services by connecting clients with qualified and compassionate professionals. The organization emphasizes core values such as compassion, professionalism, and reliability to ensure that clients receive high-quality care. Nzuri Healthcare aims to facilitate meaningful and supportive relationships between professionals and those in need of care, ensuring that both parties benefit from the services offered. Through a seamless and well-structured process, Nzuri Healthcare strives to make a positive difference in the healthcare sector.",
  },
  {
    title: "What sector does Nzuri healthcare covers",
    detail:
      "Nzuri Healthcare specializes in providing qualified professionals to meet the staffing needs of various industries, which includes healthcare facilities, warehouses, companies, and individuals. Our services encompasses the availability of healthcare assistants, support workers, nurses, and cleaners, ensuring that these critical roles are filled by experienced and dedicated personnel who uphold high standards of care and hygiene. Nzuri Healthcare is committed to connecting clients in need of care with professionals seeking rewarding job opportunities, while maintaining core values of compassion, professionalism, and reliability.",
  },
  {
    title: "What agencies does Nzuri healthcare partners with",
    detail:
      "Nzuri healthcare partners with varieties of organisations, such as Healthcare centers, Residential Care homes, Private hospitals, NHS hospitals, Community health organisations and lot more.",
  },
  {
    title: "What are your standards for ensuring data protection?",
    detail:
      "At Nzuri healthcare, we ensure data (clients) is fully encrypted to the highest standard and not in anyway shared with anyone or thirdparty. We comply full to legal standards adhering to all relevant data protection laws and regulations",
  },
  {
    title: "How easy is it to get onboarded into Nzuri healthcares",
    detail:
      "Getting onboarded into Nzuri healthcare is designed to be a seamless and straightforward process. We have streamlined our onboarding procedure to ensure that new clients and partners can quickly and easily start benefiting from our services. Check our how it works Page for more information",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Sign up",
    description: "Create your professional account to join the Nzuri network.",
    href: "/auth/signup",
    cta: "Create account",
    Icon: HiUserPlus,
    accent: "from-emerald-600 to-teal-700",
  },
  {
    step: 2,
    title: "Verify",
    description: "Confirm your email so we can keep your account secure.",
    Icon: HiEnvelopeOpen,
    accent: "from-sky-600 to-blue-700",
  },
  {
    step: 3,
    title: "Log in",
    description: "Access your dashboard whenever you are ready to work with us.",
    href: "/auth/login",
    cta: "Log in",
    Icon: HiArrowRightOnRectangle,
    accent: "from-amber-500 to-orange-600",
  },
  {
    step: 4,
    title: "Complete your profile",
    description:
      "Add your experience and preferences so we can match you to suitable roles.",
    /** `/register-profile` is protected — link only shown when signed in */
    profileStep: true,
    Icon: HiClipboardDocumentCheck,
    accent: "from-primary to-emerald-800",
  },
] as const;

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);
  const supabase = useSupabaseBrowser();
  const [authUser, setAuthUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const t = setTimeout(() => setShowUnderline(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!cancelled) setAuthUser(user ?? null);
    };

    void refresh();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) setAuthUser(session?.user ?? null);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="relative w-full min-h-[50vh] bg-cover bg-center sm:min-h-[55vh] md:min-h-[65vh] lg:min-h-[72vh]"
        style={{
          backgroundImage: "url(/images/nurse.jpg)",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/15" />
        <div className="absolute inset-0 flex items-center justify-start">
          <FadeIn duration={4}>
            <h1 className="relative mt-12 max-w-4xl px-4 font-sans text-[2.5rem] font-normal leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:px-8 sm:text-[3rem] md:px-16 md:text-[3.5rem] lg:px-24 lg:text-[4rem]">
              Discover how our{" "}
              <span className="relative inline-block">
                seamless
                {showUnderline && (
                  <span className="absolute bottom-0 left-0 h-2 w-full max-w-[110%] bg-yellow-500 animate-underline" />
                )}
              </span>{" "}
              process makes the difference
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Intro */}
      <section className="border-b border-gray-200/80 bg-[#FAFAFA] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-4">
              <p className="font-title text-sm font-semibold uppercase tracking-wide text-primary">
                For professionals
              </p>
              <h2 className="mt-3 font-title text-3xl font-bold leading-tight text-blue-900 sm:text-4xl">
                How it works
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                Welcome to Nzuri Healthcare — your partner in finding meaningful
                care roles and supporting clients who need skilled professionals.
                Whether you are joining our network or returning to update your
                details, understanding these steps helps you move from sign-up to
                being ready for opportunities without guesswork.
              </p>
              <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
                Our approach is guided by compassion, professionalism, and
                reliability. Those values shape how we verify profiles, protect
                data, and connect you with organisations that fit your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-title text-sm font-semibold uppercase tracking-wide text-primary">
              Simple steps
            </p>
            <h2 className="mt-3 font-title text-3xl font-bold text-blue-900 sm:text-4xl">
              Our process
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              From account creation to a completed profile — follow the path in
              order. Each step is quick; most of your time goes into telling us
              about your experience so we can represent you accurately.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {processSteps.map((item) => {
              const Icon = item.Icon;
              return (
                <li
                  key={item.step}
                  className="flex min-h-full flex-col rounded-2xl border border-gray-200/90 bg-slate-50/80 p-6 shadow-sm transition hover:border-primary/25 hover:shadow-md sm:p-7"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md ring-4 ring-white`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="mt-4 font-title text-xs font-bold uppercase tracking-widest text-gray-400">
                    Step {String(item.step).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-title text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                  {"profileStep" in item && item.profileStep ? (
                    authUser === undefined ? (
                      <p className="mt-5 text-xs font-medium text-gray-500">
                        Checking sign-in status…
                      </p>
                    ) : authUser ? (
                      <Link
                        href="/register-profile"
                        className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 font-title text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                      >
                        Register profile
                      </Link>
                    ) : (
                      <div className="mt-5 space-y-2">
                        <Link
                          href="/auth/login"
                          className="inline-flex w-full items-center justify-center rounded-xl border-2 border-primary bg-white px-4 py-2.5 font-title text-sm font-semibold text-primary shadow-sm transition hover:bg-emerald-50"
                        >
                          Log in to continue
                        </Link>
                        <p className="text-center text-xs font-medium text-gray-500">
                          Profile registration opens after you have an account and
                          are signed in.
                        </p>
                      </div>
                    )
                  ) : "href" in item && item.href ? (
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 font-title text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                    >
                      {item.cta}
                    </Link>
                  ) : (
                    <p className="mt-5 text-xs font-medium text-gray-500">
                      We will email you a link — check your inbox and spam
                      folder.
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-title text-2xl font-bold text-gray-900 sm:text-3xl">
              Got questions? We have answers
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Browse the topics below — if something is not covered, use the
              contact options at the bottom of the page.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {accordion_data.map((item) => (
              <Accordion
                key={item.title}
                title={item.title}
                detail={item.detail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — replaces generic Hero for clearer layout */}
      <section className="relative overflow-hidden bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[min(100%,48%)] skew-x-[-6deg] bg-gradient-to-l from-emerald-700/35 to-transparent lg:skew-x-[-8deg]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-6">
              <p className="font-title text-sm font-semibold uppercase tracking-wide text-emerald-200/90">
                Next step
              </p>
              <h2 className="mt-3 font-title text-3xl font-bold leading-tight sm:text-4xl">
                Ready to work with Nzuri Healthcare?
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-emerald-50/90 sm:text-base">
                Create your account in a few minutes, or talk to our team if you
                prefer a walkthrough before you sign up. We are here to help you
                present your experience clearly and get matched to the right
                opportunities.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/12 to-white/5 p-8 shadow-2xl backdrop-blur-md sm:p-10">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/auth/signup"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-white px-6 py-4 font-title text-sm font-semibold text-primary shadow-lg transition hover:bg-emerald-50 sm:flex-none sm:px-8 sm:text-base"
                  >
                    Create an account
                  </Link>
                  <Link
                    href="/auth/login"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border-2 border-white/70 bg-transparent px-6 py-4 font-title text-sm font-semibold text-white transition hover:bg-white/10 sm:flex-none sm:px-8 sm:text-base"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-6 py-3.5 font-title text-sm font-semibold text-emerald-50 transition hover:bg-white/10 sm:w-auto sm:py-4 sm:text-base"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
