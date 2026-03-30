import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = ({ data }) => {
  return (
    <article className="flex h-full w-full max-w-106 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Project Image */}
      <div
        className={`flex h-56 items-center justify-center overflow-hidden border-b border-gray-100 bg-slate-50 p-4 md:h-60 ${
          data?.imageWrapperClass || ""
        }`}
      >
        <img
          src={data?.image}
          alt={`${data?.title} image`}
          className={`h-full w-full ${
            data?.imageClass || "object-cover object-top"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 xs:p-8">
        {/* Category */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          {data?.category}
        </p>

        {/* Title */}
        <h3 className="pt-2 text-md font-semibold text-gray-900 xxs:text-lg">
          {data?.title}
        </h3>

        {/* Description */}
        <p
          style={{ lineHeight: "20px", letterSpacing: "0%" }}
          className="mt-3 flex-1 text-wrap text-xs text-gray-600 xxs:text-[14px]"
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
          className="btn mt-6 self-start border border-gray-200 bg-white px-6 text-sm font-semibold transition-all duration-300 hover:gap-3 hover:border-picto-primary hover:text-picto-primary max-sm:w-full xs:text-[16px] xs:hover:gap-4"
        >
          Case Study
          <span className="ms-1 xs:ms-3">
            <FontAwesomeIcon icon={faArrowRight} size="l" />
          </span>
        </a>
      </div>
    </article>
  );
};

export default Projects;
