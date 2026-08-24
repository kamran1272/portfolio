import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siteConfig } from "../../data/siteData";
import SocialLinks from "../common/SocialLinks";
import QuickStats from "./QuickStats";
import personProfile from "../../assets/images/person2.jpg";

const About = () => (
	<section id="profile" className="content px-4 py-24 lg:px-8 lg:py-32">
		<div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(220px,300px)_minmax(180px,0.7fr)] lg:gap-16">
			<div>
				<p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
					About me
				</p>
				<h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
					Building with clarity, care, and purpose
				</h2>
				<div className="mt-6 space-y-4 text-sm leading-7 text-muted-text sm:text-base">
					<p>
						I am Kamran Khan, a full-stack web developer based in Lahore,
						Pakistan. I build responsive digital experiences with React,
						Laravel, and practical SEO foundations.
					</p>
					<p>
						My focus is dependable implementation: clear interfaces, useful
						business systems, and websites that are easier to use, trust, and
						maintain.
					</p>
				</div>
				<div className="mt-8 flex flex-wrap items-center gap-4">
					<a
						href={siteConfig.resumePath}
						download="Kamran_Khan_CV.pdf"
						className="inline-flex items-center gap-2 rounded-md border border-primary/50 px-4 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/10"
					>
						<FontAwesomeIcon icon={faDownload} />
						Download CV
					</a>
					<SocialLinks />
				</div>
			</div>

			<div className="mx-auto w-full max-w-xs">
				<div className="aspect-[4/5] overflow-hidden rounded-2xl border border-slate-700/70 bg-surface shadow-2xl shadow-black/20">
					<img
						src={personProfile}
						alt="Portrait of Kamran Khan"
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				</div>
			</div>

			<QuickStats />
		</div>
	</section>
);

export default About;
