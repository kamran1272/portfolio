import WorkSteps from "./WorkSteps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faCode, faBug, faRocket } from "@fortawesome/free-solid-svg-icons";

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
    title: "Testing",
    description:
      "Debug, optimize, and ensure seamless performance across devices and browsers.",
    icon: faBug,
  },
  {
    id: 4,
    title: "Deployment",
    description:
      "Deploy applications on servers or cloud platforms, ensuring scalability and security.",
    icon: faRocket,
  },
];

const WorkProcess = () => {
  return (
    <div
      className="content grid xl:grid-cols-2 xl:items-center px-2 py-5 md:py-10 lg:py-25 xl:py-35 max-xxl:px-4"
      id="work-process"
    >
      <div className="lg:pe-10 xl:pe-35.75 max-xs:mb-3 max-xl:mb-8">
        <p className="section-title max-xl:text-center">Work Process</p>
        <p className="mt-6 mb-4 md:text-[18px] text-sm font-normal max-xl:text-center text-gray-500">
          From planning to deployment, I follow a structured workflow that ensures 
          every project is delivered with quality and precision.
        </p>
        <p className="mt-6 md:text-[18px] text-sm font-normal max-xl:text-center text-gray-500">
          My process blends clean design, modern development practices, and 
          rigorous testing to build applications that are both robust and 
          user-friendly.
        </p>
      </div>

      <div className="grid xs:grid-cols-2 justify-end my-2 w-fit mx-auto ">
        {workStepData.map((data, index) => {
          return (
            <WorkSteps
              data={{
                ...data,
                svgPath: (
                  <FontAwesomeIcon
                    icon={data.icon}
                    className="text-picto-primary text-3xl mb-3"
                  />
                ),
              }}
              style={`max-xs:mt-3 p-4 sm:p-8 bg-white aspect-auto sm:max-w-78 ${
                index % 2 === 1 ? "xs:ms-3 xs:mt-6 " : "xs:mb-6"
              }`}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkProcess;
