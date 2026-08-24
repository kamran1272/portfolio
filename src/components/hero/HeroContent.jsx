import SocialLinks from "../common/SocialLinks";
import { siteConfig } from "../../data/siteData";

const HeroContent = () => (
	<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
		<p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
			Hi, I&apos;m
		</p>
		<h1 className="mt-3 text-5xl font-bold tracking-tight text-white sm:text-6xl xl:text-7xl">
			Kamran
		</h1>
		<p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary sm:text-base">
			Full-Stack Software Developer
		</p>
		<p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
			I build fast, practical web applications and business-focused digital
			experiences.
		</p>
		<p className="mt-3 max-w-xl text-sm leading-6 text-muted-text sm:text-base">
			From React interfaces and Laravel systems to responsive websites and
			technical SEO foundations.
		</p>

		<div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
			<a
				href="#portfolio"
				className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-[#07111F] transition-colors duration-200 hover:bg-primary/85"
			>
				View My Work
			</a>
			<a
				href={siteConfig.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="rounded-md border border-slate-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-primary hover:text-primary"
			>
				GitHub Profile
			</a>
		</div>

		<div className="mt-8 flex flex-col items-center gap-4 lg:items-start">
			<p className="flex items-center gap-2 text-sm text-slate-400">
				<span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
				Available for remote opportunities
			</p>
			<SocialLinks />
		</div>
	</div>
);

export default HeroContent;
