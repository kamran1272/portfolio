import ProjectGrid from "./ProjectGrid";
import { featuredProjects } from "../../data/projectsData";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import { Link } from "react-router-dom";

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
				<div className="mt-10 flex flex-col items-center gap-4 text-center">
					<p className="text-sm text-muted-text">3 featured projects &middot; 9 total projects</p>
					<Button as={Link} to="/projects" variant="secondary">
						View All Projects <span aria-hidden="true">-&gt;</span>
					</Button>
				</div>
			</Container>
		</section>
);

export default Projects;
