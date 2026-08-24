import { capabilities } from "../../data/capabilitiesData";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const Capabilities = () => (
	<section id="services" className="py-24 lg:py-32">
		<Container>
			<SectionHeading
				eyebrow="What I do"
				title="Practical skills for useful digital products"
				className="mb-12"
			/>

			<div className="grid gap-4 sm:grid-cols-2">
				{capabilities.map((capability) => (
					<article
						key={capability.title}
						className="group rounded-xl border border-slate-700/70 bg-surface p-6 transition-colors duration-300 hover:border-primary/50 sm:p-8"
					>
						<span className="font-mono text-2xl text-primary" aria-hidden="true">
							{capability.icon}
						</span>
						<h3 className="mt-6 text-xl font-semibold text-white">
							{capability.title}
						</h3>
						<p className="mt-3 text-sm leading-6 text-muted-text">
							{capability.description}
						</p>
					</article>
				))}
			</div>
		</Container>
	</section>
);

export default Capabilities;
