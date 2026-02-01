import Roles from "./Roles";

const rolesData = [
  {
    id: 1,
    title: "Frontend Development (React.js)",
    description:
      "I build responsive, modern, and user-friendly interfaces using React.js, ensuring smooth performance and excellent user experience across all devices.",
  },
  {
    id: 2,
    title: "Backend Development (Laravel)",
    description:
      "I develop secure, scalable backend systems with Laravel, implementing REST APIs, authentication, and database management for seamless integration.",
  },
  {
    id: 3,
    title: "UI Frameworks & Styling",
    description:
      "I craft clean, responsive layouts using Bootstrap and TailwindCSS, creating visually appealing interfaces that adapt beautifully to all screen sizes.",
  },
  {
    id: 4,
    title: "Local SEO & Online Visibility",
    description:
      "I optimize websites for search engines, improve local visibility, and implement strategies to help businesses attract more local customers online.",
  },
  {
    id: 5,
    title: "Database Management",
    description:
      "I manage relational databases like MySQL, ensuring optimized queries, smooth performance, and scalability for large-scale applications.",
  },
];

const Profession = () => {
  return (
    <section
      id="services"
      className="content max-w-[1200px] mx-auto py-24 px-4"
    >
      {/* Section Heading */}
      <div className="text-center mb-12">
        <p className="section-title text-3xl md:text-4xl font-semibold">
          What I Do
        </p>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mt-4">
          I specialize in Full-Stack Web Development (React.js & Laravel) and Local SEO, creating responsive, scalable, and user-friendly digital solutions that help businesses succeed online.
        </p>
      </div>

      {/* Roles / Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rolesData.map((role) => (
          <Roles
            key={role.id}
            role={role}
            style="bg-white p-6 md:p-8 rounded-2xl shadow-lg transition-transform hover:shadow-xl hover:scale-[1.03]"
          />
        ))}
      </div>
    </section>
  );
};

export default Profession;
