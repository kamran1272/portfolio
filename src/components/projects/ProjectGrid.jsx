import FeaturedProject from "./FeaturedProject";

const ProjectGrid = ({ projects }) => (
  <div className="grid gap-6 lg:grid-cols-3">
    {projects.map((project, index) => (
      <FeaturedProject key={project.id} project={project} number={index + 1} />
    ))}
  </div>
);

export default ProjectGrid;
