import { useEffect, useState } from "react";
import logo from "../../../assets/logo.jpg";
import { Link } from "react-scroll";

const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "About", url: "profile" },
  { id: 3, name: "Process", url: "work-process" },
  { id: 4, name: "Portfolio", url: "portfolio" },
  { id: 5, name: "Blog", url: "blog" },
  { id: 6, name: "Services", url: "services" },
];

const NavBar = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = navItems.map((item) => (
    <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
      <Link
        to={item.url}
        smooth={true}
        duration={900}
        spy={true}
        offset={-140}
        activeClass="bg-picto-primary text-white rounded-md"
        className="hover:text-picto-primary px-5 py-3 mx-1 cursor-pointer"
      >
        {item.name}
      </Link>
    </li>
  ));

  return (
    <div
      className={`sticky top-0 ${
        position > 50
          ? "bg-soft-white border-b border-gray-300 shadow-md"
          : "bg-white border-white"
      } z-50 transition-all duration-500`}
    >
      <div className="navbar flex justify-between mx-auto content">
        <div className="flex items-center justify-between">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow font-semibold bg-white text-black"
            >
              {menu}
            </ul>
          </div>

          <Link
            to="introduction"
            smooth={true}
            duration={900}
            className="flex items-center border-0 lg:max-xxl:ps-5 cursor-pointer"
          >
            <img
              src={logo}
              alt="Kamran Khan"
              className="h-14 w-14 rounded-full border-2 border-black hover:border-blue-500 transition-all duration-300 object-contain"
            />
            <p className="text-2xl sm:text-[32px] my-auto ms-[12px] font-semibold">
              Kamran Khan
            </p>
          </Link>
        </div>

        <div className="lg:flex items-center">
          <ul className="hidden lg:flex menu menu-horizontal text-[16px] font-medium">
            {menu}
          </ul>
          <Link
            to="contact"
            smooth={true}
            duration={900}
            className="btn btn-sm xs:btn-md sm:btn-lg btn-primary ml-4 cursor-pointer"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
