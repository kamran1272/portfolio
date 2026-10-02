import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../../data/siteData";
import { useSectionNavigation } from "../../hooks/useSectionNavigation";
import ThemeToggle from "../common/ThemeToggle";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const location = useLocation();
  const goToSection = useSectionNavigation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy only makes sense on the homepage, where the sections exist.
  // On other routes (e.g. /projects) no nav item stays highlighted.
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return undefined;
    }

    const sections = siteConfig.navigation
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavigation = (sectionId) => {
    setMenuOpen(false);
    setActiveSection(sectionId);
    goToSection(sectionId);
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    handleNavigation("introduction");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-slate-700/50 bg-background/80 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="content flex min-h-20 items-center justify-between gap-6 px-4 py-3 lg:px-8">
        <a
          href="#introduction"
          onClick={handleLogoClick}
          className="flex shrink-0 items-center gap-2 text-text"
          aria-label="Go to homepage"
        >
          <span className="font-mono text-xl font-bold text-primary">&lt;/&gt;</span>
          <span className="text-sm font-bold tracking-[0.24em]">KAMRAN</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {siteConfig.navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-slate-300 hover:text-white"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavigation(sectionId);
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-1 h-px bg-primary" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={siteConfig.resumePath}
            download="Kamran_Khan_CV.pdf"
            className="hidden items-center gap-2 rounded-md border border-primary/50 px-4 py-2 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/10 sm:flex"
          >
            <span aria-hidden="true">↓</span>
            Download Resume
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-md border border-slate-700 p-2 text-slate-200 transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
          >
            <span className="text-xl leading-none" aria-hidden="true">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <MobileMenu
          items={siteConfig.navigation}
          activeSection={activeSection}
          onNavigate={handleNavigation}
        />
      )}
    </header>
  );
};

export default Navbar;
