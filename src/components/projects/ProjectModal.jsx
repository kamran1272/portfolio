import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowUpRightFromSquare,
  faCode,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import TechBadge from "../common/TechBadge";
import { ProjectVisual } from "./ProjectVisual";
import { useSectionNavigation } from "../../hooks/useSectionNavigation";

const ProjectModal = ({ project, onClose }) => {
  const goToSection = useSectionNavigation();

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  const handleDiscuss = () => {
    onClose();
    // Let the modal unmount before navigating so the scroll lands correctly.
    setTimeout(() => goToSection("contact"), 60);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-slate-700/70 bg-surface shadow-2xl shadow-black/50 sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-700/60 px-5 py-4 sm:px-7">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
            <span className="text-primary">{project.type}</span>
            <span className="text-slate-500" aria-hidden="true">·</span>
            <span className="text-muted-text">{project.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="rounded-md border border-slate-700 p-2 text-slate-300 transition-colors hover:border-primary hover:text-primary"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-6 sm:px-7">
          <ProjectVisual project={project} large />

          <h3 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            {project.details || project.description}
          </p>

          {project.highlights?.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {project.tech?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((technology) => (
                <TechBadge key={technology}>{technology}</TechBadge>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-700/60 pt-6 sm:flex-row sm:flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-[#07111F] transition-colors hover:bg-primary/85"
              >
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-xs"
                />
                View live project
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary"
              >
                <FontAwesomeIcon icon={faCode} className="text-xs" />
                View source code
              </a>
            )}
            <button
              type="button"
              onClick={handleDiscuss}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary/50 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
              Discuss this project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
