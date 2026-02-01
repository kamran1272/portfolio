import logo from "../../../assets/logo.jpg";
import { Link } from "react-scroll";
import SocialMedia from "../socialMedia/SocialMedia";

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
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 px-4 md:px-8">
      {/* Top Section */}
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">

        {/* Logo & Description */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
          <Link to="introduction" smooth={true} duration={900} className="flex items-center gap-3 cursor-pointer">
            <img
              src={logo}
              alt="Kamran Khan"
              className="h-14 w-14 rounded-full border-2 border-white hover:border-picto-primary transition-all duration-300 object-cover"
            />
            <span className="text-2xl sm:text-3xl font-bold tracking-wide">Portfolio</span>
          </Link>
          <p className="text-gray-400 text-center lg:text-left text-sm sm:text-base max-w-xs">
            A modern portfolio showcasing my work in Full-Stack Development, React.js, Laravel, and Local SEO.
          </p>

          {/* Social Icons */}
          <SocialMedia />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center lg:justify-end lg:w-2/3">
          <nav className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                smooth={true}
                duration={900}
                offset={-80}
                spy={true}
                activeClass="text-picto-primary"
                className="group relative text-sm sm:text-base font-medium cursor-pointer transition-colors duration-300 hover:text-picto-primary"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-picto-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12"></div>

      {/* Bottom Section */}
      <div className="mt-6 max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-xs sm:text-sm">
        <p>© {copyrightYear} Kamran Khan. All Rights Reserved.</p>
        <p>
          Developed with ❤️ by{" "}
          <a href="#" className="underline hover:text-picto-primary transition-colors duration-300">
            Kamran Khan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
