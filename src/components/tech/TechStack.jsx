import { techStackGroups } from "../../data/techStackData";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import TechBadge from "../common/TechBadge";

const TechStack = () => (
	<section className="py-24 lg:py-32" id="skills">
		<Container>
			<SectionHeading
				eyebrow="Technologies I work with"
				title="A practical toolkit for reliable delivery"
				className="mb-12"
			/>

			<div className="overflow-hidden rounded-xl border border-slate-700/70 bg-surface">
			{techStackGroups.map((group, index) => (
				<div
					key={group.title}
					className={`grid gap-4 px-5 py-5 sm:grid-cols-[minmax(9rem,0.35fr)_1fr] sm:items-center sm:px-7 ${
						index > 0 ? "border-t border-slate-700/60" : ""
					}`}
				>
					<h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
						{group.title}
					</h3>
					<div className="flex flex-wrap gap-2">
						{group.technologies.map((technology) => (
							<TechBadge key={technology}>{technology}</TechBadge>
						))}
					</div>
				</div>
			))}
			</div>
		</Container>
	</section>
);

export default TechStack;
