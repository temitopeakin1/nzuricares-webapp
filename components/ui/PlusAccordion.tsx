"use client";

import { useState, useEffect, ReactNode } from "react";

interface PlusAccordionProps {
  title: ReactNode; // Allows JSX and strings
  detail: string;   // Expects a string
}

export default function PlusAccordion({
  title,
  detail,
}: PlusAccordionProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  // useEffect to initialize or reset the accordion state
  useEffect(() => {
    setAccordionOpen(false);
  }, []);

  return (
    <div className="py-2 bg-white px-8 rounded-md">
      <h2>
        <button
          className="flex items-center justify-between w-full text-left font-semibold py-2"
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen(!accordionOpen);
          }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-01`}
        >
          <div className="flex items-center gap-4">
            <span className="text-black">{title}</span>
          </div>

          {/* Toggle "+" or "-" inside a circle */}
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full border text-lg font-bold transition-all duration-200 ${
              accordionOpen ? "border-orange-500 text-orange-500" : "border-gray-400 text-gray-600"
            }`}
          >
            {accordionOpen ? "-" : "+"}
          </div>
        </button>
      </h2>
      <div
        id={`accordion-text-01`}
        role="region"
        aria-labelledby={`accordion-title-01`}
        className={`text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2">
          <p className="pb-3">{detail}</p>
        </div>
      </div>
    </div>
  );
}
