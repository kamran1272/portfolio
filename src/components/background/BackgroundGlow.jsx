const BackgroundGlow = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-primary-glow blur-3xl" />
    <div className="absolute right-[-12rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-3xl" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

export default BackgroundGlow;
