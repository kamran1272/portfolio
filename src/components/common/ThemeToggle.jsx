import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = ({ className = "" }) => {
  const { isLight, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`group flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/60 bg-surface text-slate-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-primary ${className}`}
    >
      <span
        key={isLight ? "light" : "dark"}
        className="theme-toggle-icon inline-flex text-sm"
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={isLight ? faSun : faMoon} />
      </span>
    </button>
  );
};

export default ThemeToggle;
