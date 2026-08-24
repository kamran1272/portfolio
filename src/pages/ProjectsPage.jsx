import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import ProjectGrid from "../components/projects/ProjectGrid";
import SectionHeading from "../components/common/SectionHeading";
import { projects } from "../data/projectsData";

const filters = ["All", "Full-Stack", "Frontend", "Business", "SEO"];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.filters.includes(activeFilter));

  return (
    <section className="min-h-screen py-24 lg:py-32">
      <Container>
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white">
          <span aria-hidden="true">&lt;-</span> Back to home
        </Link>
        <SectionHeading
          eyebrow="All work"
          title="Projects built with purpose"
          description="Explore full-stack, frontend, business, and SEO-focused work across personal, client, and practice projects."
          className="mb-10"
        />
        <div className="mb-10 flex flex-wrap gap-2" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${activeFilter === filter ? "border-primary bg-primary text-[#07111F]" : "border-slate-600 text-slate-300 hover:border-primary hover:text-primary"}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="mb-6 text-sm text-muted-text" aria-live="polite">Showing {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}</p>
        <ProjectGrid projects={visibleProjects} />
      </Container>
    </section>
  );
};

export default ProjectsPage;