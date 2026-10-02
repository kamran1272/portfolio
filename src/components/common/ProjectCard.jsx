import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCode,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import TechBadge from "./TechBadge";
import { ProjectVisual } from "../projects/ProjectVisual";

const linkClass =
  "inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-all duration-200";

const ProjectCard = ({ project, number, onSelect }) => {
  const primaryAction = project.liveUrl
    ? {
        label: "View live project",
        icon: faArrowUpRightFromSquare,
        href: project.liveUrl,
        external: true,
      }
    : project.codeUrl
      ? {
          label: "View source code",
          icon: faCode,
          href: project.codeUrl,
          external: true,
        }
      : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-700/70 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      <button
        type="button"
        onClick={() => onSelect?.(project)}
        className="block w-full cursor-pointer p-4 pb-0 text-left"
        aria-label={`Open case study for ${project.title}`}
      >
        <ProjectVisual project={project} />
      </button>

      <div className="flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
        <div className="flex items-center justify-between gap-4">
          {number && (
            <span className="font-mono text-sm font-semibold text-primary">
              {String(number).padStart(2, "0")}
            </span>
          )}
          <div className="ml-auto flex flex-wrap justify-end gap-2 text-right text-[10px] font-semibold uppercase tracking-[0.16em]">
            {project.type && <span className="text-primary">{project.type}</span>}
            <span className="text-muted-text">{project.category}</span>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white transition-colors group-hover:text-primary sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
          {project.description}
        </p>

        {project.tech?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((technology) => (
              <TechBadge key={technology}>{technology}</TechBadge>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-700/50 pt-5">
          {primaryAction ? (
            <a
              href={primaryAction.href}
              target={primaryAction.external ? "_blank" : undefined}
              rel={primaryAction.external ? "noopener noreferrer" : undefined}
              className={`${linkClass} bg-primary/10 text-primary hover:bg-primary hover:text-[#07111F]`}
            >
              <FontAwesomeIcon
                icon={primaryAction.icon}
                className="text-xs"
                aria-hidden="true"
              />
              {primaryAction.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onSelect?.(project)}
              className={`${linkClass} bg-primary/10 text-primary hover:bg-primary hover:text-[#07111F]`}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="text-xs"
                aria-hidden="true"
              />
              View case study
            </button>
          )}
          <button
            type="button"
            onClick={() => onSelect?.(project)}
            className={`${linkClass} text-slate-300 hover:text-primary`}
          >
            Details
            <span aria-hidden="true">-&gt;</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
