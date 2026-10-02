import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Navigate to a homepage section from anywhere in the app.
 * On the homepage it smooth-scrolls; on any other route (e.g. /projects)
 * it returns home first, then scrolls to the section once it is mounted.
 */
export const useSectionNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (sectionId) => {
      if (!sectionId) return;

      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [navigate, location.pathname]
  );
};
