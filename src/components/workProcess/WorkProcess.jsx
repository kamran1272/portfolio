import WorkSteps from "./WorkSteps";
import { faProjectDiagram, faCode, faBug, faRocket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { workProcess } from "../../data/siteData";

const workStepIcons = [faProjectDiagram, faCode, faSearch, faBug, faRocket];

const WorkProcess = () => {
  return (
    <section
      id="work-process"
      className="max-w-[1200px] mx-auto px-4 py-16 md:py-24"
    >
      <div className="text-center mb-12">
        <h2
          id="work-process-title"
          className="section-title text-3xl md:text-4xl font-semibold"
        >
          Work Process
        </h2>
        <p className="mt-4 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          A strong project needs more than attractive visuals. My workflow keeps
          the build process organized from planning through launch, with
          attention to usability, performance, and SEO details.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workProcess.map((step, index) => (
          <WorkSteps
            key={step.id}
            data={{
              ...step,
              icon: workStepIcons[index],
            }}
            style="bg-white p-6 md:p-8 rounded-2xl shadow-lg transition-transform hover:shadow-xl hover:scale-[1.03]"
          />
        ))}
      </ol>
    </section>
  );
};

export default WorkProcess;
