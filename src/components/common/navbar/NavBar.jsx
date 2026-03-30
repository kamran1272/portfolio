import { useEffect, useState } from "react";
import logo from "../../../assets/logo.jpg";
import { siteConfig } from "../../../data/siteData";

const NavBar = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = siteConfig.navigation.map((item) => (
    <li key={item.href}>
      <a
        href={item.href}
        className="rounded-md px-5 py-3 mx-1 hover:text-picto-primary focus:outline-none focus:text-picto-primary"
      >
        {item.label}
      </a>
    </li>
  ));

  return (
    <header
      className={`sticky top-0 ${
        position > 50
          ? "bg-soft-white/95 border-b border-gray-300 shadow-md backdrop-blur"
          : "bg-white/95 border-white"
      } z-50 transition-all duration-500`}
    >
      <div className="navbar flex justify-between mx-auto content">
        <div className="flex items-center justify-between">
          <div className="dropdown">
            <button
              type="button"
              tabIndex={0}
              aria-label="Open navigation menu"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow font-semibold bg-white text-black"
            >
              {menu}
            </ul>
          </div>

          <a
            href="#introduction"
            className="flex items-center border-0 lg:max-xxl:ps-5"
            aria-label="Go to homepage section"
          >
            <img
              src={logo}
              alt="Kamran Khan"
              className="h-14 w-14 rounded-full border-2 border-black hover:border-blue-500 transition-all duration-300 object-contain"
            />
            <div className="ms-[12px]">
              <p className="text-2xl sm:text-[32px] font-semibold">
                {siteConfig.personName}
              </p>
              <p className="hidden sm:block text-sm text-gray-500">
                {siteConfig.shortTitle}
              </p>
            </div>
          </a>
        </div>

        <nav aria-label="Primary navigation" className="lg:flex items-center">
          <ul className="hidden lg:flex menu menu-horizontal text-[16px] font-medium">
            {menu}
          </ul>
          <a
            href="#contact"
            className="btn btn-sm xs:btn-md sm:btn-lg btn-primary ml-4"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
