"use client";

import FadeIn from "@/components/ui/FadeIn";
import { useEffect, useState } from "react";
// import { IconType } from "react-icons/lib";
import Footer from "@/components/ui/Footer";
import Personal from "./personal";
import ChooseSection from "./chooseSection";


// interface CareSettingsProps {
//   icon: IconType;
//   title: string;
// }

// const CareSettings: React.FC<CareSettingsProps> = ({ icon: Icon, title }) => {
//   return (
//     <div className="flex flex-col items-center w-full p-4 mx-4 my-2">
//       <Icon size={64} className="text-white" />
//       <p className="mt-2 text-lg font-semibold text-white">{title}</p>
//     </div>
//   );
// };

const Page = () => {
  const [showUnderline, setShowUnderline] = useState(false);

  // for the underline animation on text
  useEffect(() => {
    setTimeout(() => {
      setShowUnderline(true);
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[70vh] lg:min-h-[85vh]"
        style={{
          backgroundImage: "url(/images/holistic.jpg)",
          backgroundPosition: "center 25%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 flex items-end bg-black/25 pb-12 pt-28 sm:items-center sm:pb-16 sm:pt-24 md:pb-20 md:pt-28">
          <FadeIn duration={4}>
            <h1 className="max-w-[min(100%,42rem)] px-4 text-3xl font-normal leading-tight text-white sm:max-w-none sm:px-8 sm:text-4xl md:px-12 md:text-5xl lg:px-16 lg:text-6xl font-sans">
              Where&nbsp;
              <span className="relative inline-block">
                Personalised Care
                {showUnderline && (
                  <span className="absolute bottom-0 left-0 h-1.5 w-full bg-yellow-500 animate-underline sm:h-2" />
                )}
              </span>{" "}
              <br />
              <span className="relative mt-1 inline-block sm:mt-0">
                Meets Trusted Support
              </span>
            </h1>
          </FadeIn>
        </div>
      </div>
      <Personal />
      <ChooseSection />
      <Footer />
    </div>
  );
};

export default Page;
