import ProjectGrid from "./ProjectGrid";
import { featuredProjects } from "../../data/projectsData";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const Projects = () => (
		<section id="portfolio" className="py-24 lg:py-32">
			<Container>
				<SectionHeading
					eyebrow="Selected work"
					title="Products built for real-world use"
					description="A focused selection of full-stack, frontend, and client-oriented work."
					className="mb-12"
				/>
				<ProjectGrid projects={featuredProjects} />
			</Container>
		</section>
);

export default Projects;
