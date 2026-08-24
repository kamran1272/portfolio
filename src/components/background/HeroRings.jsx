const HeroRings = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -inset-16 z-0 aspect-square w-[calc(100%+8rem)] animate-[spin_40s_linear_infinite]"
  >
    <span className="absolute inset-[8%] rounded-full border border-primary/15" />
    <span className="absolute inset-[19%] rounded-full border border-secondary/20" />
    <span className="absolute inset-[31%] rounded-full border border-primary/15" />
    <span className="absolute inset-[42%] rounded-full border border-slate-400/15" />
  </div>
);

export default HeroRings;
