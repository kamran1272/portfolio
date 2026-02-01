import WorkSteps from "./WorkSteps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faCode, faBug, faRocket, faSearch } from "@fortawesome/free-solid-svg-icons";

const workStepData = [
  {
    id: 1,
    title: "Planning",
    description:
      "Understand client requirements, define features, and design a scalable project structure.",
    icon: faProjectDiagram,
  },
  {
    id: 2,
    title: "Development",
    description:
      "Build responsive and user-friendly applications using React.js, Laravel, APIs, and modern UI frameworks.",
    icon: faCode,
  },
  {
    id: 3,
    title: "SEO & Local Optimization",
    description:
      "Optimize websites for search engines, improve local visibility, and increase organic traffic for businesses.",
    icon: faSearch,
  },
  {
    id: 4,
    title: "Testing & Optimization",
    description:
      "Debug, optimize, and ensure seamless performance across devices, browsers, and SEO metrics.",
    icon: faBug,
  },
  {
    id: 5,
    title: "Deployment",
    description:
      "Deploy applications on servers or cloud platforms, ensuring scalability, security, and SEO readiness.",
    icon: faRocket,
  },
];

const WorkProcess = () => {
  return (
    <section
      id="work-process"
      className="max-w-[1200px] mx-auto px-4 py-16 md:py-24"
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <p className="section-title text-3xl md:text-4xl font-semibold">
          Work Process
        </p>
        <p className="mt-4 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          From planning to deployment, I follow a structured workflow that ensures every project is delivered
          with quality, precision, and search engine readiness. My process blends clean design, modern development
          practices, rigorous testing, and Local SEO strategies to build applications that are robust, user-friendly,
          and visible online.
        </p>
      </div>

      {/* Work Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workStepData.map((step, index) => (
          <WorkSteps
            key={step.id}
            data={{
              ...step,
              svgPath: (
                <FontAwesomeIcon
                  icon={step.icon}
                  className="text-picto-primary text-3xl mb-3"
                />
              ),
            }}
            style="bg-white p-6 md:p-8 rounded-2xl shadow-lg transition-transform hover:shadow-xl hover:scale-[1.03]"
          />
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;
