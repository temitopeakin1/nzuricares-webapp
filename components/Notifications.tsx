import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Notification = ({setShowNotification}:{
  setShowNotification:React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="bg-secondary p-1  md:p-2 flex items-center  justify-between">
      <div className="hidden md:inline" />
      <div className="  md:p-2 flex flex-col  md:items-center  md:gap-4 gap-1  md:flex-row">
        <p className="text-primary ">
          current news from Nzuricares
        </p>
        <div className="flex items-center text-center gap-2">
          <a>
            <u>Read More</u>
          </a>

          <FaLongArrowAltRight />
        </div>
      </div>

      <button onClick={()=> setShowNotification(false)} >
      <AiOutlineClose className={`text-[1.5em]`} />
      </button>

    </div>
  );
};

export default Notification;
