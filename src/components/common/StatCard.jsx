const StatCard = ({ value, label }) => (
  <div className="rounded-xl border border-slate-700/70 bg-surface-light px-5 py-4 lg:px-6">
    <p className="text-3xl font-bold text-primary">{value}</p>
    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-text">
      {label}
    </p>
  </div>
);

export default StatCard;
