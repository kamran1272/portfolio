import { techStackGroups } from "../../data/techStackData";
import { projects } from "../../data/projectsData";
import StatCard from "../common/StatCard";

const quickStats = [
  { value: String(projects.length), label: "Projects built" },
  { value: "2+", label: "Years of experience" },
  {
    value: `${techStackGroups.reduce((total, group) => total + group.technologies.length, 0)}+`,
    label: "Technologies used",
  },
];

const QuickStats = () => (
  <aside
    aria-label="Quick statistics"
    className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
  >
    {quickStats.map((stat) => (
      <StatCard key={stat.label} value={stat.value} label={stat.label} />
    ))}
  </aside>
);

export default QuickStats;