import logo from "../../../assets/logo.jpg";
import SocialMedia from "../socialMedia/SocialMedia";
import { siteConfig } from "../../../data/siteData";

const copyrightYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
        <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
          <a href="#introduction" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Kamran Khan"
              className="h-14 w-14 rounded-full border-2 border-white hover:border-picto-primary transition-all duration-300 object-cover"
            />
            <span className="text-2xl sm:text-3xl font-bold tracking-wide">
              {siteConfig.personName}
            </span>
          </a>
          <p className="text-gray-400 text-center lg:text-left text-sm sm:text-base max-w-xs">
            Full-stack developer focused on building clean React and Laravel
            experiences with strong UX and better SEO foundations.
          </p>
          <SocialMedia />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center lg:justify-end lg:w-2/3">
          <nav
            aria-label="Footer navigation"
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center"
          >
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-sm sm:text-base font-medium transition-colors duration-300 hover:text-picto-primary"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-picto-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </nav>

          <div className="text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
              Contact
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block text-white hover:text-picto-primary"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="mt-2 block text-white hover:text-picto-primary"
            >
              {siteConfig.phoneDisplay}
            </a>
            <p className="mt-2 text-gray-400">{siteConfig.location}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12"></div>

      <div className="mt-6 max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-xs sm:text-sm">
        <p>&copy; {copyrightYear} {siteConfig.personName}. All rights reserved.</p>
        <p>
          Built by{" "}
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-picto-primary transition-colors duration-300"
          >
            {siteConfig.personName}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
