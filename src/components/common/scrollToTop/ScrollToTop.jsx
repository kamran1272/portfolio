import { useEffect, useState } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { animateScroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // a bit lower threshold for visibility
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop({
      duration: 600,
      smooth: "easeInOutQuad",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-6 sm:bottom-10 sm:right-10 lg:bottom-12 lg:right-12
        flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
        rounded-full bg-picto-primary text-white shadow-lg transition-all duration-300
        hover:scale-110 hover:shadow-2xl hover:bg-picto-primary-dark focus:outline-none
        z-50
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      `}
    >
      <FontAwesomeIcon icon={faAngleUp} className="text-xl sm:text-2xl lg:text-3xl" />
    </button>
  );
};

export default ScrollToTop;
