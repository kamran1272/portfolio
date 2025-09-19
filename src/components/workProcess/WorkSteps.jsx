import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkSteps = ({ data, style }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`rounded-xl hover:drop-shadow-2xl shadow-gray-300 ease-out duration-1000 ${
        style && style
      }`}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div
        className={`w-11 h-11 sm:w-18 sm:h-18 ${
          hover ? "bg-picto-primary text-white" : "bg-[#EDD8FF80] text-picto-primary"
        } text-center center rounded-md flex items-center justify-center`}
      >
        <FontAwesomeIcon
          icon={data?.icon}
          className="text-xl sm:text-2xl transition-all duration-500"
        />
      </div>

      <div className="mt-3 xs:mt-4 sm:mt-8">
        <p className="font-semibold sm:text-xl">{`${data?.id}. ${data?.title}`}</p>
        <p className="mt-3 text-[13px] sm:text-[16px] text-[#697482]">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default WorkSteps;
