// components/UI/AnimatedArrow.tsx

import React from "react";

const AnimatedArrow: React.FC = () => (
  <svg
  className="animate-bounce mt-2 mb-2 text-primary"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 5l7 7m0 0l-7 7m7-7H6"
    />
  </svg>
);

export default AnimatedArrow;
