import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Address = ({ item }) => {
  const [hover, setHover] = useState(false);

  // Create clickable links for email & phone
  const renderDescription = () => {
    if (item?.title === "My Email") {
      return (
        <a
          href={`mailto:${item?.description}`}
          className="hover:underline text-picto-primary"
        >
          {item?.description}
        </a>
      );
    }
    if (item?.title === "Call Me Now") {
      return (
        <a
          href={`tel:${item?.description}`}
          className="hover:underline text-picto-primary"
        >
          {item?.description}
        </a>
      );
    }
    return item?.description;
  };

  return (
    <div
      className="max-w-84 p-3 md:p-3.75 lg:p-6 flex rounded-[10px] bg-white transform transition-all duration-300 cursor-pointer hover:scale-[1.05] hover:shadow-[0px_0px_37px_5px_rgba(0,_0,_0,_0.1)] shadow-gray-200 max-sm:mx-auto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`h-10 md:h-12 aspect-square flex items-center justify-center transition-colors duration-300 ${
          hover ? "bg-picto-primary" : "bg-[#EDD8FF80]"
        } rounded-[4px]`}
      >
        <FontAwesomeIcon
          icon={item?.icon}
          className={`text-lg md:text-xl transition-colors duration-300 ${
            hover ? "text-white" : "text-picto-primary"
          }`}
        />
      </div>
      <div className="ms-3.25">
        <p className="text-[12px] md:text-[14px] text-[#424E60] font-normal">
          {item?.title}:
        </p>
        <p className="text-[14px] md:text-[16px] text-[#132238] font-medium">
          {renderDescription()}
        </p>
      </div>
    </div>
  );
};

export default Address;
