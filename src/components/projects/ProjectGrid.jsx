import FeaturedProject from "./FeaturedProject";

const ProjectGrid = ({ projects, onSelect }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {projects.map((project, index) => (
      <FeaturedProject
        key={project.id}
        project={project}
        number={index + 1}
        onSelect={onSelect}
      />
    ))}
  </div>
);

export default ProjectGrid;
