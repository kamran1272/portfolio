import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkTogether = () => {
  return (
    <div className="py-25 max-w-169 mx-auto px-2">
      <div className="text-center">
        {/* Heading */}
        <p className="text-white md:font-semibold text-2xl sm:text-3xl md:text-5xl pb-8">
          Do you have a Project Idea? Let's discuss your project!
        </p>

        {/* Subheading */}
        <p className="text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8">
          I'm always open to discussing new projects and creative ideas. Let's
          connect and build something amazing together.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {/* Email Button */}
          <a
            href="mailto:kamranofficial7212@gmail.com"
            className="btn btn-primary px-4 md:px-6.5 py-3 md:py-6 text-[12px] md:text-[16px] hover:bg-picto-secondary transition-all duration-300"
          >
            Let's work Together
            <FontAwesomeIcon
              icon={faArrowRight}
              size="l"
              style={{ color: "#FFFFFF" }}
              className="ms-3"
            />
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/923307162505"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-green-500 hover:bg-green-600 px-4 md:px-6.5 py-3 md:py-6 text-[12px] md:text-[16px] text-white transition-all duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkTogether;
