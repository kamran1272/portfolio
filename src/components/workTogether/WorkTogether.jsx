import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siteConfig } from "../../data/siteData";

const WorkTogether = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#1E1E2F]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white font-semibold text-2xl sm:text-3xl md:text-5xl pb-6 sm:pb-8">
          Ready to improve your website or build something new?
        </h2>

        <p className="text-gray-400 text-sm sm:text-lg font-normal pb-8">
          I am open to freelance work, portfolio refreshes, business website
          builds, and full-stack product development.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn btn-primary flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-picto-secondary"
          >
            Email me
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ms-3"
              size="lg"
            />
          </a>

          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn flex items-center justify-center bg-green-500 hover:bg-green-600 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white transition-all duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkTogether;
