const CodeCard = () => (
	<div className="w-full max-w-sm rounded-xl border border-slate-700/70 bg-surface p-5 font-mono text-xs leading-6 text-slate-300 shadow-2xl shadow-black/20 sm:p-6">
		<div className="mb-5 flex items-center gap-2 border-b border-slate-700/60 pb-4">
			<span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
			<span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
			<span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
			<span className="ml-auto text-[10px] text-slate-500">kamran.js</span>
		</div>
		<pre className="overflow-x-auto whitespace-pre-wrap">
			<code>
				<span className="text-secondary">const</span> kamran = &#123;{"\n"}
				<span className="text-primary">  role</span>: "Full-Stack Developer",{"\n"}
				<span className="text-primary">  focus</span>: ["React", "Laravel", "SEO"],{"\n"}
				<span className="text-primary">  passion</span>: "Building useful products",{"\n"}
				<span className="text-primary">  currently</span>: "Open to opportunities"{"\n"}
				&#125;;
			</code>
		</pre>
	</div>
);

export default CodeCard;
