import { siteConfig } from "../../data/siteData";
import SocialLinks from "../common/SocialLinks";
import Container from "../common/Container";

const Footer = () => (
	<footer className="border-t border-slate-800/80 bg-surface px-4 py-12 text-slate-300 lg:px-8">
		<Container className="px-0 lg:px-0">
			<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
				<div className="max-w-sm">
					<a href="#introduction" className="flex items-center gap-2 text-white">
						<span className="font-mono text-xl font-bold text-primary">&lt;/&gt;</span>
						<span className="text-sm font-bold tracking-[0.24em]">KAMRAN</span>
					</a>
					<p className="mt-4 text-sm leading-6 text-muted-text">
						Full-stack developer building practical React, Laravel, and SEO-focused digital experiences.
					</p>
					<div className="mt-5">
						<SocialLinks />
					</div>
				</div>

				<div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
					<nav aria-label="Footer navigation">
						<p className="text-xs uppercase tracking-[0.18em] text-slate-500">Navigate</p>
						<div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
							{siteConfig.navigation.map((item) => (
								<a
									key={`${item.label}-${item.href}`}
									href={item.href}
									className="text-sm transition-colors duration-200 hover:text-primary"
								>
									{item.label}
								</a>
							))}
						</div>
					</nav>

					<div>
						<p className="text-xs uppercase tracking-[0.18em] text-slate-500">Contact</p>
						<a href={`mailto:${siteConfig.email}`} className="mt-4 block text-sm hover:text-primary">
							{siteConfig.email}
						</a>
						<p className="mt-3 text-sm text-muted-text">{siteConfig.location}</p>
					</div>
				</div>
			</div>

			<div className="mt-10 border-t border-slate-800/80 pt-6 text-xs text-slate-500">
				<p>&copy; {new Date().getFullYear()} {siteConfig.personName}. All rights reserved.</p>
			</div>
		</Container>
	</footer>
);

export default Footer;
