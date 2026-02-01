import Marquee from "react-fast-marquee";
import { FaReact, FaLaravel, FaGithub, FaBootstrap, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiFigma, SiJavascript, SiMongodb, SiPostgresql } from "react-icons/si";

const iconClass = "h-8 w-8 sm:h-12 sm:w-12 md:h-14 md:w-14 text-gray-500";

const techLogos = [
  <FaHtml5 className={`${iconClass} text-orange-500`} />,
  <FaCss3Alt className={`${iconClass} text-blue-500`} />,
  <SiJavascript className={`${iconClass} text-yellow-400`} />,
  <FaReact className={`${iconClass} text-cyan-400`} />,
  <FaLaravel className={`${iconClass} text-red-500`} />,
  <SiTailwindcss className={`${iconClass} text-sky-400`} />,
  <FaBootstrap className={`${iconClass} text-purple-600`} />,
  <SiMysql className={`${iconClass} text-blue-700`} />,
  <SiMongodb className={`${iconClass} text-green-600`} />,
  <FaNodeJs className={`${iconClass} text-green-500`} />,
  <FaDocker className={`${iconClass} text-blue-400`} />,
  <FaGithub className={`${iconClass}`} />,
  <SiFigma className={`${iconClass} text-pink-500`} />,
];

const SkillsShowcase = () => {
  return (
    <div className="content py-10 md:py-25 flex flex-col items-center px-2">
      <div className="max-w-144.25 text-center">
        <p className="section-title mb-6">Technologies I Use</p>
        <p className="text-[14px] sm:text-lg text-soft-dark font-normal">
          Here are the tools, frameworks, and technologies I work with to build modern web applications.
        </p>
      </div>
      <Marquee pauseOnHover={true} speed={100}>
        <p className="flex items-center pt-4 md:pt-10">
          {techLogos?.map((logo, index) => (
            <span className="ps-6 sm:ps-10 md:ps-20" key={index}>
              {logo}
            </span>
          ))}
        </p>
      </Marquee>
    </div>
  );
};

export default SkillsShowcase;
