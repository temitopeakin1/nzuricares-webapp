import React from 'react';
import Image from "next/image";

const section_data = [
  { image: "/images/home-care.jpg" },
  { image: "/images/home-care2.jpg" }
];

const Content = () => {
  return (
    <div className="flex flex-row">
      {/* Left side with stacked images */}
      <div className="relative flex items-start justify-center p-12 md:p-24">
        <Image
          src={section_data[0].image}
          width={50}
          height={50}
          alt="first image"
          className="w-full"
          layout="responsive"
        />
        
        {/* Second image slightly shifted below the first image */}
        <Image
          src={section_data[1].image}
          width={150}
          height={100}
          alt="second image"
          className="absolute top-[80px] left-0 w-full"
          layout="responsive"
        />
      </div>

      {/* Right side with content */}
      <div className="ml-8 flex flex-col justify-center">
        <p>Your content goes here</p>
        {/* You can add more content here */}
      </div>
    </div>
  );
};

export default Content;
