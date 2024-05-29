import React from "react";

interface ProcessStepProps {
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ title, description }) => (
  <div className="relative flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md"> {/* Set a fixed width for consistent size */}
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

export default ProcessStep;
