import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = ({ data }) => {
  return (
    <div className="max-w-106 rounded-lg outline-[#FFFFFF] hover:shadow-2xl duration-300 transition-all shadow-gray-300 border border-gray-200">
      {/* Project Image */}
      <img src={data?.image} alt={`${data?.title} image`} className="rounded-t-lg" />

      <div className="p-4 xs:p-8">
        {/* Category */}
        <p className="text-gray-400 text-xs font-medium">{data?.category}</p>

        {/* Title */}
        <p className="text-gray-900 text-md xxs:text-lg font-semibold pt-1 mb-3">
          {data?.title}
        </p>

        {/* Description */}
        <p
          style={{ lineHeight: "20px", letterSpacing: "0%" }}
          className="text-gray-600 text-xs xxs:text-[14px] text-wrap"
        >
          {data?.description}
        </p>

        {/* Tech Stack (optional) */}
        {data?.tech && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.tech.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Button */}
        <a
          href={data?.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn hover:border-picto-primary hover:text-picto-primary bg-white text-sm xs:text-[16px] font-semibold hover:gap-3 xs:hover:gap-4 transition-all duration-300 mt-5 xs:py-5.75 px-6 max-sm:w-full"
        >
          Case Study
          <span className="ms-1 xs:ms-3">
            <FontAwesomeIcon icon={faArrowRight} size="l" />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Projects;
