import React from "react";
import Image from "next/image";
import CareAccordion from "./care-accordion";

const ChooseSection = () => {
  return (
    <div className="py-16 m-0 w-full">
      <div className="flex w-full h-auto">
        {/* First Section with Slate background (spans 3/4 of the screen) */}
        <div className="p-4 md:p-16 w-3/4 bg-slate-200 h-auto ">
          <div className="mt-2 md:mt-4 font-semibold text-2xl">
            Who Can Benefit from Personalised Care?
          </div>
          <p className="mt-2 md:mt-4 font-body font-normal text-justify ">
            <strong>Personalised care</strong> is about moving away from a
            one-size-fits-all approach to healthcare. It involves working
            collaboratively with individuals to understand their unique
            requirements, health conditions, and lifestyle. By doing so, we
            create a care plan that is as unique as they are.
          </p>
          <ul className="list-disc list-inside font-body font-normal mt-2 md:mt-4 text-md">
            <li>Elderly individuals requiring tailored support.</li>
            <li>Patients with chronic illnesses or disabilities.</li>
            <li>Individuals recovering from surgery or illness.</li>
            <li>Families seeking professional support for their loved ones.</li>
          </ul>
          <div className="mt-2 md:mt-4 font-semibold text-2xl">
            We are here to help you when you need us
          </div>
          <p className="mt-2 md:mt-4 font-body font-normal  text-justify">
            We prioritize timely and responsive care, ensuring that no matter
            the circumstances, you never feel alone. From creating tailored care
            plans to offering compassionate, round-the-clock support, we aim to
            provide peace of mind and enhance your quality of life. Our
            commitment is rooted in building trust, fostering dignity, and
            promoting independence—because when you need us, you deserve nothing
            less than exceptional care. With a dedicated team of healthcare
            professionals, we are always ready to listen, act, and deliver care
            that truly makes a difference. <br />
            <strong>
              {" "}
              Your well-being is our priority, and we&apos;re here to help,
              every step of the way
            </strong>
            .
          </p>
          <div className="mt-2 md:mt-8">
            <CareAccordion />
          </div>
        </div>
        {/* Second Section with Red background (spans 1/4 of the screen) */}
        <div className="w-1/4 items-center justify-center  bg-[#ebf5f5] h-screen p-4 md:p-8">
          <Image
            src={"/images/banner-service.jpg"}
            width={1500}
            height={1500}
            alt="contact"
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseSection;
