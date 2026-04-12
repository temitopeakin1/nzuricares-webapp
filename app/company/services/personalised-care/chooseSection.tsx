import React from "react";
import Image from "next/image";
import CareAccordion from "./care-accordion";

const ChooseSection = () => {
  return (
    <div className="m-0 w-full py-10 sm:py-12 md:py-16">
      <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
        <div className="order-2 w-full bg-slate-200 px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:order-1 lg:flex-[3] lg:min-w-0 lg:px-12 lg:py-16 xl:px-16">
          <h2 className="font-title text-xl font-semibold text-[#283544] sm:text-2xl md:text-3xl">
            Who Can Benefit from Personalised Care?
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-justify text-[#283544] sm:mt-4 sm:text-base md:text-lg">
            <strong>Personalised care</strong> is about moving away from a
            one-size-fits-all approach to healthcare. It involves working
            collaboratively with individuals to understand their unique
            requirements, health conditions, and lifestyle. By doing so, we
            create a care plan that is as unique as they are.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 font-body text-sm leading-relaxed text-[#283544] marker:text-blue-800 sm:mt-4 sm:text-base md:text-lg">
            <li>Elderly individuals requiring tailored support.</li>
            <li>Patients with chronic illnesses or disabilities.</li>
            <li>Individuals recovering from surgery or illness.</li>
            <li>Families seeking professional support for their loved ones.</li>
          </ul>
          <h2 className="mt-8 font-title text-xl font-semibold text-[#283544] sm:mt-10 sm:text-2xl md:text-3xl">
            We are here to help you when you need us
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-justify text-[#283544] sm:mt-4 sm:text-base md:text-lg">
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
              Your well-being is our priority, and we&apos;re here to help,
              every step of the way
            </strong>
            .
          </p>
          <div className="mt-6 sm:mt-8 md:mt-10">
            <CareAccordion />
          </div>
        </div>

        <div className="relative order-1 flex min-h-[220px] w-full items-stretch justify-center bg-[#ebf5f5] sm:min-h-[280px] lg:order-2 lg:min-h-0 lg:flex-1 lg:max-w-md">
          <div className="relative h-full min-h-[220px] w-full sm:min-h-[280px] lg:min-h-[28rem]">
            <Image
              src="/images/banner-service.jpg"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 28rem"
              alt="Personalised care services"
              priority={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSection;
