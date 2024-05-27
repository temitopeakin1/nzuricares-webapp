"use client";

import { useState, useEffect } from "react";

export default function Accordion({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  // state variables
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  // useEffect to create side effects 
  useEffect(() => {
    setAccordionOpen(false);
  }, []);

  return (
    <div className="py-2 bg-white px-8 rounded-md ">
      <h2>
        <button
          className={`flex items-center justify-between w-full text-left font-semibold py-2 ${
            accordionOpen && "border-primary border-[1px] rounded-md p-2 px-4"
          }}`}
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen(!accordionOpen);
          }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-01`}
        >
          <div className="flex items-center gap-2 ">
            <svg
              className={`fill-indigo-500 shrink-0  transition-transform origin-center duration-200 ease-out ${
                accordionOpen ? "rotate-180" : ""
              }`}
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.64645 4.64645C1.84171 4.45118 2.15829 4.45118 2.35355 4.64645L8 10.2929L13.6464 4.64645C13.8417 4.45118 14.1583 4.45118 14.3536 4.64645C14.5488 4.84171 14.5488 5.15829 14.3536 5.35355L8.35355 11.3536C8.15829 11.5488 7.84171 11.5488 7.64645 11.3536L1.64645 5.35355C1.45118 5.15829 1.45118 4.84171 1.64645 4.64645Z"
                fill="#667085"
              />
            </svg>
            <span className="text-black">{title} </span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.9307 6.58789L7.92875 11.293C7.85844 11.6328 7.95805 11.8262 8.23344 11.8262C8.4268 11.8262 8.71977 11.7559 8.91898 11.5801L8.83109 11.9961C8.54398 12.3418 7.91117 12.5938 7.36625 12.5938C6.66313 12.5938 6.3643 12.1719 6.55766 11.2754L7.29594 7.80664C7.36039 7.51367 7.3018 7.4082 7.00883 7.33789L6.55766 7.25586L6.63969 6.875L8.9307 6.58789ZM8 5.5C7.44772 5.5 7 5.05228 7 4.5C7 3.94772 7.44772 3.5 8 3.5C8.55229 3.5 9 3.94772 9 4.5C9 5.05228 8.55229 5.5 8 5.5Z"
              fill={accordionOpen ? "#F29127" : "#787878"}
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-text-01`}
        role="region"
        aria-labelledby={`accordion-title-01`}
        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden mt-2">
          <p className="pb-3">{detail}</p>
        </div>
      </div>
    </div>
  );
}
