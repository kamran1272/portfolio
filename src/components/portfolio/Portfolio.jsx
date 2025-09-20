import Projects from "./Projects";
import card1 from "../../assets/images/portfolio-images/card-1.png";
import card2 from "../../assets/images/portfolio-images/card-2.png";
import card3 from "../../assets/images/portfolio-images/card-3.png";
import card4 from "../../assets/images/portfolio-images/card-4.png";
import card5 from "../../assets/images/portfolio-images/card-5.png";
import card6 from "../../assets/images/portfolio-images/card-6.png";

const projectData = [
  {
    id: 1,
    image: card1,
    category: "LARAVEL / FULL-STACK",
    title: "KickZone – Sports Management System",
    description:
      "Developed a role-based sports management platform for teams, events, and scheduling with authentication and access control.",
    link: "https://github.com/yourgithub/kickzone", 
  },
  {
    id: 2,
    image: card2,
    category: "REACT.JS / FRONTEND",
    title: "Hospital Management System",
    description:
      "Built a single-page application to manage patient records, staff, and appointments with React Hooks and dynamic routing.",
    link: "https://github.com/yourgithub/hms", 
  },
  {
    id: 3,
    image: card3,
    category: "LARAVEL / FULL-STACK",
    title: "Pharmacy Management System",
    description:
      "Inventory and sales tracking system with secure role-based authentication, CRUD operations, and optimized database queries.",
    link: "https://github.com/yourgithub/pharmacy", 
  },
  
  {
    id: 4,
    image: card4,
    category: "COMING SOON",
    title: "Next Project",
    description: "A new project is under development — stay tuned for updates!",
    link: "#!",
  },
  {
    id: 5,
    image: card5,
    category: "COMING SOON",
    title: "Portfolio Expansion",
    description: "Additional work will be showcased here in the near future.",
    link: "#!",
  },
  {
    id: 6,
    image: card6,
    category: "COMING SOON",
    title: "Open Source Contributions",
    description: "Highlighting open-source and freelance projects soon.",
    link: "#!",
  },
];

const Portfolio = () => {
  return (
    <div
      className="content mt-10 md:mt-15 xl:mt-25 mb-10 md:mb-25 max-xxl:p-2"
      id="portfolio"
    >
      <div className="xl:mb-17.5 mb-5">
        <div className="max-sm:px-2 text-center mx-auto max-w-144.25">
          <p className="section-title ">Portfolio</p>
          <p className="font-normal text-[18px] max-sm:text-[14px] pt-6 text-gray-400">
            A showcase of my recent projects in Laravel and React.js, focusing on
            building scalable, responsive, and user-friendly web applications.
          </p>
        </div>
      </div>
      <div className="mx-auto flex justify-center">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
          {projectData.map((data) => (
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
          View More on GitHub
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
