import logo from "../../../assets/logo.jpg";
import { Link } from "react-scroll";

/* Footer navLinks */
const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "About", url: "profile" },
  { id: 3, name: "Process", url: "work-process" },
  { id: 4, name: "Portfolio", url: "portfolio" },
  { id: 5, name: "Blog", url: "blog" },
  { id: 6, name: "Services", url: "services" },
  { id: 7, name: "Contact", url: "contact" },
];

const copyrightYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="pt-16 md:pt-24 content max-2xl:px-3 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <Link
          to="introduction"
          smooth={true}
          duration={900}
          className="flex items-center gap-3 border-0 cursor-pointer"
        >
          <img
            src={logo}
            alt="Kamran Khan"
            className="h-14 w-14 rounded-full border-2 border-black hover:border-blue-500 transition-all duration-300 object-contain"
          />
          <p className="text-2xl sm:text-[28px] font-semibold tracking-wide">
            Portfolio
          </p>
        </Link>

        <nav className="flex flex-wrap justify-center gap-4 text-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.url}
              smooth={true}
              duration={900}
              offset={-80}
              spy={true}
              activeClass="text-picto-primary"
              className="group relative text-sm sm:text-base font-medium cursor-pointer"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
        </nav>

        <p className="text-xs sm:text-sm text-gray-300">
          © {copyrightYear} Kamran's Portfolio. All Rights Reserved.
        </p>
      </div>

      <p className="text-center text-gray-400 text-xs sm:text-sm mt-8">
        Developed with ❤️ by{" "}
        <a
          href="#"
          className="underline font-semibold hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kamran Khan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
