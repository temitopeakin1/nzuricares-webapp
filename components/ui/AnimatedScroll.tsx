"use client";

import React from "react";

interface AnimatedProps {
  targetId: string;
}

const AnimatedScroll: React.FC<AnimatedProps> = ({ targetId }) => {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
    className="flex items-center justify-center h-[80vh] cursor-pointer mt-80"
    onClick={handleScroll}
      style={{ cursor: "pointer" }}
      aria-label="Scroll-down"
    >
      <svg
        className="scroll-svg animate bounce large-arrow text-white border border-white rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="64"
        height="72"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </div>
  );
};

export default AnimatedScroll;
