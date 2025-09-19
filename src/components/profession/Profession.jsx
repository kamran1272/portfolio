import Roles from "./Roles";

const rolesData = [
  {
    id: 1,
    title: "Frontend Development (React.js)",
    description:
      "I build responsive, modern, and user-friendly interfaces with React.js, ensuring smooth performance and great user experience across all devices.",
  },
  {
    id: 2,
    title: "Backend Development (Laravel)",
    description:
      "I develop secure and scalable backend systems using Laravel, implementing REST APIs and database management for seamless integration.",
  },
  {
    id: 3,
    title: "UI Frameworks & Styling",
    description:
      "I use Bootstrap and TailwindCSS to craft clean, responsive, and visually appealing layouts that adapt beautifully across devices.",
  },
  {
    id: 4,
    title: "Database Management",
    description:
      "I manage relational databases like MySQL, ensuring optimized queries, smooth performance, and scalability for large applications.",
  },
];

const Profession = () => {
  return (
    <div
      className="content grid md:grid-cols-2 max-xxl:px-4 xxl:px-2 py-10 md:py-15 lg:py-37.5"
      id="services"
    >
      {/* Left Section */}
      <div className="flex flex-col justify-between h-fit md:pe-8 lg:pe-35.75 max-md:text-center my-auto">
        <p className="section-title max-md:text-center">What I do?</p>

        <div className="mt-6 text-[14px]">
          <p className="text-xs sm:text-lg font-normal text-gray-400 mb-4">
            I specialize in creating responsive web applications with{" "}
            <strong>React.js</strong> and <strong>Laravel</strong>, combining
            functionality with elegant design.
          </p>
          <p className="text-xs sm:text-lg font-normal text-gray-400">
            With expertise in <strong>Bootstrap</strong>,{" "}
            <strong>TailwindCSS</strong>, and <strong>database management</strong>,
            I deliver modern, scalable, and user-friendly solutions.
          </p>
        </div>

        <a
          href="#contact"
          className="mt-5 md:mt-12.5 btn btn-primary text-white w-fit md:py-3 md:px-6 text-[12px] sm:text-[16px] font-semibold max-md:mx-auto max-md:mb-5"
        >
          Say Hello!
        </a>
      </div>

      {/* Right Section */}
      <div>
        {rolesData.map((role) => (
          <Roles role={role} key={role.id} />
        ))}
      </div>
    </div>
  );
};

export default Profession;
