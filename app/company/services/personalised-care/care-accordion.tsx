import PlusAccordion from "@/components/ui/PlusAccordion";
import React from "react";

const accordion_data = [
  {
    title: "Care from home health aides",
    detail:
      "We send a doctor to visit the patient at home to diagnose and treat the illnesses. He or she may also periodically review the home health care needs.",
  },
  {
    title: "Homemaker or basic assistance",
    detail:
      "The most common form of home health care. It is a type of nursing care that depends on the individual needs. Through consultation with the doctor, a registered nurse will set up a plan of care.",
  },
  {
    title: "Physical / occupational therapy",
    detail:
      "Nzuri healthcare partners with varieties of organisations, such as Healthcare centers, Residential Care homes, Private hospitals, NHS hospitals, Community health organisations and lot more.",
  },
  {
    title: "Laboratory and X-ray imaging",
    detail:
      "Physical / mental / occupational therapy provides patients with help on relearning how to perform daily duties or improve their speech after a severe illness or injury.",
  },
];

const CareAccordion = () => {
  return (
    <div className="mt-2 w-full min-w-0 md:mt-8">
      {accordion_data.map((item, index) => (
        <div
          key={item.title}
          className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center sm:gap-4"
        >
          <span className="shrink-0 pt-2 font-title text-lg font-bold text-blue-800 tabular-nums sm:pt-0 sm:text-2xl">
            {String(index + 1).padStart(2, "0")}.
          </span>
          <div className="min-w-0 flex-1">
            <PlusAccordion title={item.title} detail={item.detail} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareAccordion;


// {accordion_data.map((item, index) => (
//     <PlusAccordion
//       key={item.title}
//       title={
//         <div className="flex items-center gap-1.5 mb-2">
//           <span className="text-red-500 font-bold text-2xl">
//             {String(index + 1).padStart(2, "0")}.
//           </span>
//           <span>{item.title}</span>
//         </div>
//       }
//       detail={item.detail}
//     />
//   ))}


//   {accordion_data.map((item, index) => (
//     <div key={item.title} className="flex items-center gap-4 mb-4">
//       <span className="text-blue-800 font-bold text-2xl">
//         {String(index + 1).padStart(2, "0")}.
//       </span>
//       <div className="flex-1">
//         <PlusAccordion
//           key={item.title}
//           title={item?.title}
//           detail={item?.detail}
//         />
//       </div>
//     </div>
//   ))}
