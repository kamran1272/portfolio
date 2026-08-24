const SectionHeading = ({ eyebrow, title, description, className = "" }) => (
  <div className={`max-w-2xl ${className}`}>
    {eyebrow && (
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
    )}
    <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-sm leading-6 text-muted-text sm:text-base">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
