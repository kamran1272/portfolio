import { techStack } from "../../data/siteData";

const HappyClients = () => {
  return (
    <section className="content py-10 md:py-25 flex flex-col items-center px-2">
      <div className="max-w-144.25 text-center">
        <h2 className="section-title mb-6">Core Stack</h2>
        <p className="text-[14px] sm:text-lg text-soft-dark font-normal">
          These are the tools and capabilities I use most often when building
          modern websites and web applications.
        </p>
      </div>
      <div className="mt-10 grid w-full max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {techStack.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-gray-200 bg-white px-5 py-4 text-center font-medium text-gray-700 shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HappyClients;
