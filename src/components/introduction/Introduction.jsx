import "./introduction.css";
import InformationSummary from "./InformationSummary";
import { siteConfig, stats } from "../../data/siteData";

const Introduction = () => {
  return (
    <section
      className="flex max-lg:flex-col-reverse sm:justify-between pt-10 lg:pt-31.5 lg:mb-27.5 max-xl:gap-2 p-2 max-xxl:px-4"
      id="introduction"
    >
      <div className="w-full flex flex-col justify-between max-lg:text-center">
        <div className="pt-13 me-31.5 w-full lg:w-auto transition-all duration-500">
          <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.22em] text-picto-primary">
            Available for freelance and contract work
          </p>
          <h1 className="mt-4 text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full leading-tight">
            Building professional web experiences with{" "}
            <span className="text-nowrap shrink-0 inline-block w-full text-highlight">
              React, Laravel, and SEO thinking
            </span>
          </h1>
          <p className="text-xs xxs:text-lg lg:text-[18px] my-6 text-gray-700">
            I am <span className="bg-highlight">{siteConfig.personName}</span>, a{" "}
            <span className="bg-highlight">
              {siteConfig.jobTitle.toLowerCase()}
            </span>{" "}
            based in {siteConfig.location}. I build responsive websites and
            business applications that feel polished, perform well, and present
            a brand clearly online.
          </p>
          <div className="flex max-lg:justify-center gap-4 flex-wrap">
            <a
              className="btn-primary btn btn-xs xxs:btn-lg text-white"
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Say hello on WhatsApp
            </a>
            <a
              className="btn btn-xs xxs:btn-lg bg-white border border-gray-200 hover:border-picto-primary hover:text-picto-primary"
              href="#portfolio"
            >
              View selected work
            </a>
          </div>
        </div>
        <div className="mx-auto lg:mx-0 relative">
          <div className="grid max-xxs:grid-flow-col grid-cols-3 w-fit mt-10 gap-1">
            {stats.map((item) => (
              <InformationSummary key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`max-w-134 w-full h-full max-lg:mx-auto aspect-[536/636] relative`}
      >
        <img
          className={`shadow-2xl shadow-gray-200 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl`}
          src={siteConfig.heroImage}
          alt="Kamran Khan, full-stack web developer"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};

export default Introduction;
