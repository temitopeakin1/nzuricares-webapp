import type { ElementType } from "react";
import {
  FaClipboardList,
  FaHandsHelping,
  FaRegFileAlt,
  FaUserMd,
} from "react-icons/fa";

const section_data = [
  {
    title: "Comprehensive Assessment",
    desc: "Our process begins with a thorough consultation and needs assessment. This helps us gain insight into the individual's medical history, lifestyle preferences, and specific care requirements.",
    Icon: FaClipboardList,
  },
  {
    title: "Tailored Care Plans",
    desc: "Based on the assessment, we develop a customised care plan. This plan outlines the type of support needed, the schedule of care, and the healthcare professionals involved.",
    Icon: FaRegFileAlt,
  },
  {
    title: "Multidisciplinary Expertise",
    desc: "Our team of dedicated professionals—including nurses, healthcare assistants, cleaners, and support workers—works together to deliver high-quality, personalised care.",
    Icon: FaUserMd,
  },
  {
    title: "Respect for Preferences",
    desc: "We prioritize the individual's preferences, whether it’s how care is delivered, the time of service, or cultural and dietary considerations.",
    Icon: FaHandsHelping,
  },
];

const Section = ({
  title,
  desc,
  Icon,
  index,
}: {
  title: string;
  desc: string;
  Icon: ElementType;
  index: number;
}) => {
  const isReverse = index % 2 === 0;
  return (
    <div
      className={`flex w-full max-w-6xl flex-col items-stretch justify-center gap-6 px-3 py-6 sm:gap-8 sm:px-4 sm:py-8 md:gap-12 lg:gap-16 xl:gap-24 ${
        isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="flex w-full flex-1 items-center justify-center rounded-lg bg-[#8E9CE0] p-3 sm:p-4">
        <div className="flex w-full flex-col items-center rounded-lg bg-[#E5EBF5] px-6 py-8 sm:px-10 sm:py-10 md:p-12">
          <div className="flex items-center justify-center rounded-full bg-[#8E9CE0] p-4 text-white sm:p-5 md:p-6">
            <Icon className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 px-1 sm:px-0">
        <p className="text-center font-title text-lg font-bold leading-snug text-[#283544] sm:text-xl md:text-left md:text-2xl lg:text-3xl xl:text-4xl">
          {title}
        </p>
        <p className="mt-3 text-justify font-body text-sm leading-relaxed text-[#283544] sm:text-base md:mt-4 md:text-lg">
          {desc}
        </p>
      </div>
    </div>
  );
};

const Personal = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center px-3 sm:px-4">
        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 py-6 md:py-10">
          <p className="text-justify font-body text-base font-semibold leading-relaxed text-[#283544] sm:text-lg md:text-xl">
            At Nzuri Healthcare Recruitment limited, We believe that every
            individual deserves care tailored specifically to their needs,
            preferences, and circumstances.
            <br className="hidden sm:block" />{" "}
            <span className="sm:inline">
              Our Personalised Care Services are designed to put individuals at
              the heart of their care journey, ensuring a truly bespoke
              experience that promotes dignity, independence, and overall
              well-being.
            </span>
          </p>
        </div>

        <h1 className="mt-2 px-2 text-center font-title text-xl font-bold text-blue-800 sm:text-2xl md:mt-4 md:text-3xl lg:text-4xl">
          How we Deliver Personalised Care
        </h1>
        <div className="mt-8 flex w-full max-w-6xl justify-center sm:mt-10 md:mt-12">
          <div className="flex w-full flex-col items-center">
            {section_data.map((item, index) => (
              <Section
                key={item?.title}
                title={item?.title}
                desc={item?.desc}
                Icon={item?.Icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
