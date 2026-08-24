const MobileMenu = ({ items, activeSection, onNavigate }) => (
	<div className="border-t border-slate-700/40 bg-[#0B1626] lg:hidden">
		<nav aria-label="Mobile navigation" className="content px-4 py-4">
			<ul className="flex flex-col gap-1">
				{items.map((item) => {
					const sectionId = item.href.replace("#", "");
					const isActive = activeSection === sectionId;

					return (
						<li key={item.href}>
							<a
								href={item.href}
								onClick={() => onNavigate(sectionId)}
								className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
									isActive
										? "bg-primary/10 text-primary"
										: "text-slate-300 hover:bg-slate-800/60 hover:text-white"
								}`}
							>
								{item.label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	</div>
);

export default MobileMenu;
