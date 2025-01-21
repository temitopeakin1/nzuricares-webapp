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
  Icon: React.ElementType;
  index: number;
}) => {
  const isReverse = index % 2 === 0;
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 md:p-8 gap-[20px] md:gap-[98px] ${
        isReverse ? " md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex-1 bg-[#8E9CE0] w-full flex items-center justify-center rounded-md p-4 ">
        <div className="flex flex-col items-center w-full bg-[#E5EBF5] p-12 rounded-lg">
          <div className="flex items-center justify-center bg-[#8E9CE0] text-white rounded-full p-6">
            <Icon size={100} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <p className="font-bold text-[#283544] text-xl md:text-4xl text-center md:text-justify leading-none font-title">
          {title}
        </p>
        <p className=" text-[16px] md:text-[18px] text-justify md:text-justify mt-2 px-4 sm:px-0 md:px-0 font-body">
          {desc}
        </p>
      </div>
    </div>
  );
};

const Personal = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col gap-6 items-center justify-center py-0 md:py-8 w-full md:w-[50%]">
          {/* <div className="border-t-primary border-b-primary border-t-2 border-b-2 p-4 md:p-6"> */}
          <p className="regular mt-4 md:mt-0 text-xl font-semibold items-center justify-center text-justify md:text-justify p-8 md:p-8 ">
            At Nzuri Healthcare Recruitment limited, We believe that every
            individual deserves care tailored specifically to their needs,
            preferences, and circumstances.
            <br /> Our Personalised Care Services are designed to put
            individuals at the heart of their care journey, ensuring a truly
            bespoke experience that promotes dignity, independence, and overall
            well-being.
          </p>
          {/* </div> */}
        </div>

        <h1 className="mt-2 font-bold text-xl md:text-4xl  text-blue-800 font-title ">
          How we Deliver Personalised Care
        </h1>
        <div className="flex item-center justify-center mt-12">
          <div className="w-full md:w-[80%]">
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
