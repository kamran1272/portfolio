import ProjectCard from "../common/ProjectCard";

const FeaturedProject = ({ project, number, onSelect }) => (
  <ProjectCard project={project} number={number} onSelect={onSelect} />
);

export default FeaturedProject;
