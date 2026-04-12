"use client";

import FadeIn from "@/components/ui/FadeIn";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaClipboardCheck,
  FaHospital,
  FaShieldVirus,
  FaUserFriends,
} from "react-icons/fa";
import { MdCleanHands, MdOutlineHealthAndSafety } from "react-icons/md";
import { HiOutlineShieldCheck } from "react-icons/hi";

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowUnderline(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const pillars = [
    {
      Icon: FaShieldVirus,
      title: "Infection prevention & control",
      description:
        "Evidence-based IPC practices aligned with UK guidance so your teams reduce transmission risk, protect vulnerable people, and maintain audit-ready standards day to day.",
      accent: "from-emerald-600/90 to-teal-800",
    },
    {
      Icon: MdCleanHands,
      title: "Hygiene & environmental standards",
      description:
        "Support for hand hygiene programmes, cleaning schedules, PPE use, and safe waste handling — helping staff turn policy into consistent, practical behaviour on every shift.",
    },
    {
      Icon: FaClipboardCheck,
      title: "Compliance & assurance",
      description:
        "Clear documentation, competency checks, and escalation pathways so managers can demonstrate due diligence to regulators, commissioners, and families with confidence.",
    },
  ] as const;

  const settings = [
    {
      Icon: FaHospital,
      label: "Hospitals & acute settings",
    },
    {
      Icon: FaUserFriends,
      label: "Care homes & residential care",
    },
    {
      Icon: MdOutlineHealthAndSafety,
      label: "Domiciliary & community services",
    },
  ] as const;

  const challengePoints = [
    "Outbreaks & seasonal pressure",
    "CQC & NHS IPC expectations",
    "Staffing gaps on critical shifts",
  ] as const;

  const PillarIconA = pillars[0].Icon;
  const PillarIconB = pillars[1].Icon;
  const PillarIconC = pillars[2].Icon;

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[70vh] lg:min-h-[78vh]"
        style={{
          backgroundImage: "url(/images/infections.jpg)",
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 flex items-end bg-black/35 pb-12 pt-28 sm:items-center sm:pb-16 sm:pt-24 md:pb-20 md:pt-28">
          <FadeIn duration={4}>
            <h1 className="relative mt-12 px-4 font-sans text-[2.5rem] font-normal leading-tight text-white sm:px-8 sm:text-[3rem] md:px-16 md:text-[3.5rem] lg:px-24 lg:text-[4rem]">
              Expert Staffing solutions for <br />
              <span className="relative inline-block">
                {showUnderline && (
                  <span className="absolute bottom-0 left-0 h-2 bg-yellow-500 animate-underline" />
                )}
                Infection Control{" "}
              </span>
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Why it matters — split grid + stat strip */}
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
                <HiOutlineShieldCheck className="h-4 w-4" aria-hidden />
                Why it matters
              </p>
              <h2 className="mt-6 font-title text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                Safe care starts with rigorous infection control
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                Outbreaks, resistant organisms, and seasonal pressures never stop
                testing health and social care. A strong IPC and hygiene culture
                protects everyone on site — and backs your reputation with
                regulators, commissioners, and families.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-3">
                {challengePoints.map((label, i) => (
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
                  Nzuri Healthcare places professionals who understand IPC in
                  context — isolation precautions, outbreak response, cleaning
                  rounds, audits, and calm communication with families when it
                  matters most.
                </p>
                <div className="mt-4 flex shrink-0 flex-wrap gap-2 sm:mt-0 sm:flex-col">
                  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-center font-title text-xs font-semibold uppercase tracking-wide text-emerald-100 ring-1 ring-white/15">
                    CQC-ready mindset
                  </span>
                  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-center font-title text-xs font-semibold uppercase tracking-wide text-emerald-100 ring-1 ring-white/15">
                    NHS IPC alignment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars — asymmetric bento */}
      <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-xl">
              <p className="font-title text-sm font-semibold uppercase tracking-wide text-primary">
                How we support you
              </p>
              <h2 className="mt-2 font-title text-3xl font-bold text-gray-900 sm:text-4xl">
                IPC &amp; hygiene, embedded in real frontline work
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-600 md:text-right md:text-base">
              Three pillars we use when matching people to your infection control
              and hygiene priorities — not generic staffing, but the right
              behaviours on every shift.
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

      {/* Environments + CTA — split columns + angled panel */}
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
                Built for high-trust care environments
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-emerald-100/90 sm:text-base">
                Single site or regional portfolio — we connect you with people
                who take IPC seriously, alongside dignity, teamwork, and continuity
                of care.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {settings.map(({ Icon, label }, i) => (
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
                <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 md:block" aria-hidden />
                <p className="font-title text-lg font-semibold text-white sm:text-xl">
                  Ready to strengthen your IPC &amp; hygiene workforce?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-emerald-50/85 sm:text-base">
                  Tell us about your setting, shift patterns, and competencies — we
                  will help you plan cover that keeps standards high when demand
                  spikes.
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
