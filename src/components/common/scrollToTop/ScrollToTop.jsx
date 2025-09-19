import { useEffect, useState } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { animateScroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop({
      duration: 600,
      smooth: true,
    });
  };

  return (
    <div className="flex justify-end relative z-50">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-6 sm:bottom-10 sm:right-10 lg:bottom-12 lg:right-12 
          flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
          rounded-full bg-picto-primary text-white shadow-lg transition-all duration-500
          hover:scale-110 hover:shadow-xl hover:bg-picto-primary-dark focus:outline-none
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      >
        <FontAwesomeIcon icon={faAngleUp} size="lg" />
      </button>
    </div>
  );
};

export default ScrollToTop;
