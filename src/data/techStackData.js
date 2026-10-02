import {
  faBullseye,
  faCode,
  faDatabase,
  faLaptopCode,
  faScrewdriverWrench,
  faServer,
} from "@fortawesome/free-solid-svg-icons";

export const techStackGroups = [
  {
    title: "Languages",
    icon: faCode,
    technologies: ["JavaScript", "PHP", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    icon: faLaptopCode,
    technologies: ["React", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend",
    icon: faServer,
    technologies: ["Laravel", "Node.js", "REST APIs"],
  },
  {
    title: "Database",
    icon: faDatabase,
    technologies: ["MySQL"],
  },
  {
    title: "Tools",
    icon: faScrewdriverWrench,
    technologies: ["Git", "GitHub", "Figma"],
  },
  {
    title: "Specialization",
    icon: faBullseye,
    technologies: ["Responsive Design", "Technical SEO", "Local SEO"],
  },
];
