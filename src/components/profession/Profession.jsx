import Roles from "./Roles";
import { services } from "../../data/siteData";

const Profession = () => {
  return (
    <section
      id="services"
      className="content max-w-[1200px] mx-auto py-24 px-4"
    >
      <div className="text-center mb-12">
        <h2
          id="services-title"
          className="section-title text-3xl md:text-4xl font-semibold"
        >
          What I Do
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mt-4">
          I help businesses and personal brands present themselves better online
          through thoughtful development, practical SEO improvements, and
          polished frontend execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((role) => (
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
