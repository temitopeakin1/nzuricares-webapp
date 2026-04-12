"use client";

import { useState, useEffect, useId, ReactNode } from "react";

interface PlusAccordionProps {
  title: ReactNode; // Allows JSX and strings
  detail: string;   // Expects a string
}

export default function PlusAccordion({
  title,
  detail,
}: PlusAccordionProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const panelId = useId();
  const buttonId = `${panelId}-btn`;

  // useEffect to initialize or reset the accordion state
  useEffect(() => {
    setAccordionOpen(false);
  }, []);

  return (
    <div className="rounded-md bg-white px-3 py-2 shadow-sm sm:px-5 md:px-6">
      <h2 className="text-base sm:text-lg">
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-start justify-between gap-3 py-2 text-left font-semibold text-[#283544] sm:items-center"
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen(!accordionOpen);
          }}
          aria-expanded={accordionOpen}
          aria-controls={panelId}
        >
          <span className="min-w-0 flex-1 pr-1 leading-snug">{title}</span>

          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-base font-bold transition-all duration-200 sm:h-8 sm:w-8 sm:text-lg ${
              accordionOpen
                ? "border-orange-500 text-orange-500"
                : "border-gray-400 text-gray-600"
            }`}
            aria-hidden
          >
            {accordionOpen ? "−" : "+"}
          </span>
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden text-slate-600 transition-[max-height,opacity] duration-300 ease-in-out ${
          accordionOpen
            ? "max-h-[min(70vh,36rem)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-1 border-t border-slate-100 pt-2">
          <p className="pb-3 text-left text-sm leading-relaxed sm:text-base">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}
