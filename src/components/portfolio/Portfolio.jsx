import Projects from "./Projects";
import { projects } from "../../data/siteData";

const Portfolio = () => {
  return (
    <section
      className="content mt-10 md:mt-15 xl:mt-25 mb-10 md:mb-25 max-xxl:p-2"
      id="portfolio"
    >
      <div className="xl:mb-17.5 mb-5">
        <div className="max-sm:px-2 text-center mx-auto max-w-144.25">
          <h2 id="portfolio-title" className="section-title ">
            Selected Work
          </h2>
          <p className="font-normal text-[18px] max-sm:text-[14px] pt-6 text-gray-400">
            A selection of projects that highlight full-stack development,
            frontend implementation, and the kind of business-focused work I
            enjoy building.
          </p>
        </div>
      </div>
      <div className="mx-auto flex justify-center">
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((data) => (
            <Projects data={data} key={data.id} />
          ))}
        </div>
      </div>
      <div className="text-center">
        <a
          href="https://github.com/kamran1272"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary py-3 px-6 mt-12.5 text-center text-[16px] font-semibold"
        >
          View more on GitHub
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
