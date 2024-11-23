import React, { useState } from "react";
import {
  FaHandsHelping,
  FaLayerGroup,
  FaTools,
  FaChalkboardTeacher,
  FaUserFriends,
  FaSyncAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/app/components/shared/button";

interface BenefitItemProps {
  Icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  layoutId: string; // Added layoutId for shared animations
}

const BenefitItem: React.FC<BenefitItemProps> = ({
  Icon,
  title,
  description,
  onClick,
  layoutId,
}) => {
  return (
    <motion.div
      initial={{
        rotate: "0deg",
      }}
      animate={{
        rotate: "360deg",
      }}
      transition={{
        duration: 2,
        ease: "anticipate",
      }}
      layoutId={layoutId}
      className="flex flex-col items-center w-80 md:w-100 sm:w-100 mx-4 pb-8 rounded-lg shadow-md cursor-pointer"
      onClick={onClick}
    >
      {/* Upper part with icon and background color */}
      <div className="flex flex-col items-center w-full bg-[#E5EBF5] p-12 rounded-lg">
        <div className="flex items-center justify-center bg-[#8E9CE0] text-white rounded-full p-6">
          <Icon size={40} />
        </div>
      </div>

      {/* Title and description section */}
      <p className="mt-4 text-lg font-semibold text-[#283544]">{title}</p>
      <p className="mt-2 text-sm font-body">{description}</p>
    </motion.div>
  );
};

const Benefits = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);

  const benefits = [
    {
      Icon: FaLayerGroup,
      title: "Updated Training Modules",
      description:
        "Our implementation is a patient-centered approach that emphasizes personalized treatment plans.",
    },
    {
      Icon: FaTools,
      title: "Comprehensive Practical Training",
      description:
        "Preventing the spread of infections in healthcare and implementing strict hygiene protocols.",
    },
    {
      Icon: FaHandsHelping,
      title: "Ongoing Support & Mentorship",
      description:
        "We offer integrated training services that address physical, mental, and emotional health.",
    },
    {
      Icon: FaChalkboardTeacher,
      title: "Expert Guidance",
      description: "Learn directly from experienced Healthcare Professionals.",
    },
    {
      Icon: FaUserFriends,
      title: "Community Engagement",
      description:
        "Engage with a network of like-minded Healthcare Professionals.",
    },
    {
      Icon: FaSyncAlt,
      title: "Continuous Improvement",
      description:
        "Our modules are constantly updated to reflect the latest industry standards.",
    },
  ];

  // Calculate items to display
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = benefits.slice(startIndex, endIndex);

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <div className="py-8 md:py-16 text-center">
      <h1 className="mt-2 font-bold text-xl md:text-4xl text-blue-800 font-title">
        Training Benefits
      </h1>

      {/* Benefits Items */}
      <div className="mt-8 gap-16 flex flex-wrap justify-center">
        {currentItems.map((item, index) => (
          <BenefitItem
            key={startIndex + index}
            Icon={item.Icon}
            title={item.title}
            description={item.description}
            layoutId={`benefit-${startIndex + index}`}
            onClick={() => setSelectedBenefit(startIndex + index)}
          />
        ))}
      </div>

      {/* Horizontal Navigation Dots */}
      <div className="mt-12 flex justify-center items-center gap-2">
        {Array.from({ length: Math.ceil(benefits.length / itemsPerPage) }).map(
          (_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                index === currentPage ? "bg-blue-800" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
            />
          )
        )}
      </div>

      {/* Modal for Selected Benefit */}
      <AnimatePresence>
        {selectedBenefit !== null && (
          <motion.div
            layoutId={`benefit-${selectedBenefit}`}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setSelectedBenefit(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-8 w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <div className="bg-[#8E9CE0] text-white rounded-full p-6">
                  {/* <benefits[selectedBenefit]?.Icon size={40} /> */}
                  {React.createElement(benefits[selectedBenefit]?.Icon, {
                    size: 40,
                  })}
                </div>
                <h2 className="mt-4 text-lg font-bold">
                  {benefits[selectedBenefit]?.title}
                </h2>
                <p className="mt-2 text-sm">
                  {benefits[selectedBenefit]?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-center mt-4 md:mt-8">
        <Button />
      </div>
    </div>
  );
};

export default Benefits;
