import TechBadge from "./TechBadge";

const ProjectCard = ({ project, number }) => (
	<article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-700/70 bg-surface transition-colors duration-300 hover:border-primary/50">
		<div
			className={`flex h-64 items-center justify-center overflow-hidden border-b border-slate-700/70 bg-surface-light p-4 sm:h-72 ${
				project.imageWrapperClass || ""
			}`}
		>
			<img
				src={project.image}
				alt={`${project.title} preview`}
				loading="lazy"
				className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
					project.imageClass || "object-cover object-top"
				}`}
			/>
		</div>

		<div className="flex flex-1 flex-col p-6 sm:p-7">
			<div className="flex items-center justify-between gap-4">
				{number && (
					<span className="font-mono text-sm font-semibold text-primary">
						{String(number).padStart(2, "0")}
					</span>
				)}
				<div className="ml-auto flex flex-wrap justify-end gap-2 text-right text-[10px] font-semibold uppercase tracking-[0.16em]">
					{project.type && <span className="text-primary">{project.type}</span>}
					<span className="text-muted-text">{project.category}</span>
				</div>
			</div>
			<h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
				{project.title}
			</h3>
			<p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
				{project.description}
			</p>

			{project.tech?.length > 0 && (
				<div className="mt-6 flex flex-wrap gap-2">
					{project.tech.map((technology) => (
						<TechBadge key={technology}>{technology}</TechBadge>
					))}
				</div>
			)}

			{project.link && (
				<a
					href={project.link}
					target={project.external ? "_blank" : undefined}
					rel={project.external ? "noopener noreferrer" : undefined}
					className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 hover:text-white"
				>
					{project.linkLabel || "Request walkthrough"}
					<span aria-hidden="true">-&gt;</span>
				</a>
			)}
		</div>
	</article>
);

export default ProjectCard;
