import HeroContent from "./HeroContent";
import CodeCard from "./CodeCard";
import HeroStats from "./HeroStats";
import HeroRings from "../background/HeroRings";
import personHero from "../../assets/images/person.jpg";

const heroStats = [
	{ id: "experience", title: "Years of Experience", description: "2+" },
	{ id: "projects", title: "Projects Built", description: "10+" },
	{ id: "focus", title: "Core Focus Areas", description: "3" },
];

const Hero = () => (
	<section id="introduction" className="relative content flex min-h-[calc(100vh-5rem)] items-center px-4 py-20 sm:py-24 lg:px-8 lg:py-28">
		<div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)_minmax(0,1fr)] lg:gap-10 xl:gap-16">
			<HeroContent />

			<div className="relative mx-auto w-full max-w-sm lg:max-w-md">
				<HeroRings />
				<div className="absolute -inset-6 rounded-full bg-primary-glow blur-3xl" />
				<div className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-2xl shadow-black/40">
					<img
						src={personHero}
						alt="Kamran Khan, full-stack web developer"
						className="h-full w-full object-cover"
						fetchPriority="high"
					/>
				</div>
			</div>

			<div className="flex flex-col items-center gap-6 lg:items-end lg:pl-4">
				<CodeCard />
				<HeroStats stats={heroStats} />
			</div>
		</div>
	</section>
);

export default Hero;
