const HeroStats = ({ stats }) => (
	<div className="grid w-full max-w-sm grid-cols-3 gap-3">
		{stats.map((item) => (
			<div
				key={item.id}
				className="rounded-lg border border-slate-700/70 bg-surface-light px-2 py-4 text-center"
			>
				<p className="text-2xl font-bold text-primary">{item.description}</p>
				<p className="mt-1 text-[10px] leading-4 text-slate-400 sm:text-xs">
					{item.title}
				</p>
			</div>
		))}
	</div>
);

export default HeroStats;
