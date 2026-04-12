"use client";

import FadeIn from "@/components/ui/FadeIn";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaCertificate,
  FaHospital,
  FaLayerGroup,
  FaUserFriends,
} from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineModelTraining } from "react-icons/md";
import Benefits from "./benefits";

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowUnderline(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const pillars = [
    {
      Icon: FaLayerGroup,
      title: "Structured learning pathways",
      description:
        "Modular programmes that build from foundations to specialist topics — so new starters and experienced staff progress with clarity, not one-off tick-box sessions.",
      accent: "from-emerald-600/90 to-teal-800",
    },
    {
      Icon: FaChalkboardTeacher,
      title: "Practice-led delivery",
      description:
        "Scenarios, demonstrations, and supervised practice that mirror real shifts — infection control, moving & handling, safeguarding, medicines awareness, and more.",
    },
    {
      Icon: FaCertificate,
      title: "Compliance & confidence",
      description:
        "Training mapped to statutory requirements, local policies, and CQC themes — with records and refreshers that help managers evidence competence with confidence.",
    },
  ] as const;

  const audiences = [
    { Icon: FaHospital, label: "NHS trusts & acute teams" },
    { Icon: FaUserFriends, label: "Care homes & residential groups" },
    { Icon: MdOutlineModelTraining, label: "Community & independent providers" },
  ] as const;

  const focusPoints = [
    "Mandatory & refresher training",
    "Skills gaps & onboarding at scale",
    "Quality & inspection readiness",
  ] as const;

  const PillarIconA = pillars[0].Icon;
  const PillarIconB = pillars[1].Icon;
  const PillarIconC = pillars[2].Icon;

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="relative w-full min-h-[50vh] bg-cover bg-center sm:min-h-[55vh] md:min-h-[70vh] lg:min-h-[78vh]"
        style={{
          backgroundImage: "url(/images/nurse.jpg)",
          backgroundPosition: "center 22%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-start">
          <FadeIn duration={4}>
            <h1 className="relative mt-12 px-4 font-sans text-[2.5rem] font-normal leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:px-8 sm:text-[3rem] md:px-16 md:text-[3.5rem] lg:px-24 lg:text-[4rem]">
              Exclusive{" "}
              <span className="relative inline-block">
                Trainings{" "}
                {showUnderline && (
                  <span className="absolute bottom-0 left-0 h-2 bg-yellow-500 animate-underline" />
                )}
              </span>
              <br /> for{" "}
              <span className="relative inline-block">
                Health professionals
              </span>
            </h1>
          </FadeIn>
        </div>
      </div>

      <Benefits />

      {/* Why training matters */}
      <section className="relative border-b border-emerald-900/10 bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <div
          className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 font-title text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-sm">
                <HiOutlineAcademicCap className="h-4 w-4" aria-hidden />
                Why it matters
              </p>
              <h2 className="mt-6 font-title text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                Capable staff start with great training
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                Healthcare moves fast — guidance updates, seasonal pressures, and
                new cohorts of staff all depend on training that is current,
                engaging, and easy to roll out across sites and teams.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-3">
                {focusPoints.map((label, i) => (
                  <div
                    key={label}
                    className="flex flex-col rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm transition hover:border-primary/25 hover:shadow-md sm:p-5"
                  >
                    <span className="font-title text-3xl font-bold tabular-nums text-primary/35 sm:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 font-title text-sm font-semibold leading-snug text-gray-900 sm:text-base">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 text-white shadow-xl sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:p-8 md:p-10">
                <p className="text-sm leading-relaxed text-emerald-50/95 sm:text-base md:text-lg">
                  Nzuri Healthcare works with providers who want training that
                  sticks — aligned to your policies, your population, and the way
                  your teams actually work on the floor.
                </p>
                <div className="mt-4 flex shrink-0 flex-wrap gap-2 sm:mt-0 sm:flex-col">
                  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-center font-title text-xs font-semibold uppercase tracking-wide text-emerald-100 ring-1 ring-white/15">
                    Blended &amp; in-person options
                  </span>
                  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-center font-title text-xs font-semibold uppercase tracking-wide text-emerald-100 ring-1 ring-white/15">
                    Partner-led expertise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training pillars — bento */}
      <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-xl">
              <p className="font-title text-sm font-semibold uppercase tracking-wide text-primary">
                How we deliver
              </p>
              <h2 className="mt-2 font-title text-3xl font-bold text-gray-900 sm:text-4xl">
                Programmes built around your workforce
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-600 md:text-right md:text-base">
              Three pillars we use when shaping training with you — from induction
              through refreshers and specialist upskilling.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:gap-5 lg:grid-cols-12 lg:grid-rows-2">
            <article className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-slate-50 shadow-sm transition hover:shadow-lg lg:col-span-7 lg:row-span-2 lg:min-h-0">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillars[0].accent} opacity-[0.07] transition group-hover:opacity-[0.11]`}
                aria-hidden
              />
              <div className="relative flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg ring-4 ring-white/80 sm:h-20 sm:w-20">
                    <PillarIconA className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden />
                  </div>
                  <span className="font-title text-7xl font-bold leading-none text-primary/[0.12] sm:text-8xl lg:text-9xl">
                    01
                  </span>
                </div>
                <h3 className="mt-6 font-title text-xl font-bold text-gray-900 sm:text-2xl">
                  {pillars[0].title}
                </h3>
                <p className="mt-4 max-w-prose flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {pillars[0].description}
                </p>
                <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-teal-500" />
              </div>
            </article>

            <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md sm:p-8 lg:col-span-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-700 text-white shadow-md">
                  <PillarIconB className="h-7 w-7" aria-hidden />
                </div>
                <span className="font-title text-5xl font-bold text-primary/15 sm:text-6xl">
                  02
                </span>
              </div>
              <h3 className="mt-5 font-title text-lg font-bold text-gray-900 sm:text-xl">
                {pillars[1].title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {pillars[1].description}
              </p>
            </article>

            <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:p-8 lg:col-span-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-800 text-white shadow-md">
                  <PillarIconC className="h-7 w-7" aria-hidden />
                </div>
                <span className="font-title text-5xl font-bold text-primary/15 sm:text-6xl">
                  03
                </span>
              </div>
              <h3 className="mt-5 font-title text-lg font-bold text-gray-900 sm:text-xl">
                {pillars[2].title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {pillars[2].description}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Audiences + CTA */}
      <section className="relative overflow-hidden bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[min(100%,52%)] skew-x-[-6deg] bg-gradient-to-l from-emerald-700/40 to-transparent lg:skew-x-[-8deg]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-title text-3xl font-bold leading-tight sm:text-4xl">
                Who we support
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-emerald-100/90 sm:text-base">
                From large systems to single services — we help you plan training
                calendars, surge onboarding, and specialist sessions that match
                your risk profile and workforce mix.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {audiences.map(({ Icon, label }, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm transition hover:border-emerald-300/30 hover:bg-white/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300/90 to-amber-600 text-slate-900 shadow-md">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="font-title text-sm font-semibold sm:text-base">
                        {label}
                      </span>
                      <span className="hidden h-px flex-1 bg-gradient-to-r from-white/25 to-transparent sm:block" />
                      <span className="shrink-0 font-mono text-xs text-emerald-200/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/12 to-white/5 p-8 shadow-2xl backdrop-blur-md sm:p-10 md:p-12">
                <div
                  className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 md:block"
                  aria-hidden
                />
                <p className="font-title text-lg font-semibold text-white sm:text-xl">
                  Ready to level up your training offer?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-emerald-50/85 sm:text-base">
                  Tell us about your teams, mandatory topics, and preferred
                  delivery — we will help you shape a programme that fits your
                  budget, schedule, and quality goals.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link
                    href="/clients/register-interest"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-white px-6 py-4 font-title text-sm font-semibold text-primary shadow-lg transition hover:bg-emerald-50 sm:flex-none sm:px-8 sm:text-base"
                  >
                    Register your interest
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border-2 border-white/70 bg-transparent px-6 py-4 font-title text-sm font-semibold text-white transition hover:bg-white/10 sm:flex-none sm:px-8 sm:text-base"
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
