import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Address = ({ item }) => {
  return (
    <a
      href={item?.link}
      target={item?.title === "Address" ? "_blank" : undefined}
      rel={item?.title === "Address" ? "noopener noreferrer" : undefined}
      className="group max-w-84 p-3 md:p-3.75 lg:p-6 flex rounded-[10px] bg-white transform transition-all duration-300 cursor-pointer hover:scale-[1.05] hover:shadow-[0px_0px_37px_5px_rgba(0,_0,_0,_0.1)] shadow-gray-200 max-sm:mx-auto"
    >
      <div className="h-10 md:h-12 aspect-square flex items-center justify-center transition-colors duration-300 bg-[#EDD8FF80] rounded-[4px] group-hover:bg-picto-primary">
        <FontAwesomeIcon
          icon={item?.icon}
          className="text-lg md:text-xl transition-colors duration-300 text-picto-primary group-hover:text-white"
        />
      </div>
      <div className="ms-3.25">
        <p className="text-[12px] md:text-[14px] text-[#424E60] font-normal">
          {item?.title}:
        </p>
        <p className="text-[14px] md:text-[16px] text-[#132238] font-medium break-all sm:break-normal">
          {item?.description}
        </p>
      </div>
    </a>
  );
};

export default Address;
