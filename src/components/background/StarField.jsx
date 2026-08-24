const stars = [
  [8, 14, 1],
  [18, 38, 1],
  [31, 10, 2],
  [43, 27, 1],
  [56, 16, 1],
  [67, 42, 1],
  [78, 12, 2],
  [91, 30, 1],
  [12, 66, 1],
  [27, 82, 1],
  [49, 71, 1],
  [73, 77, 1],
  [88, 62, 1],
];

const StarField = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
    {stars.map(([left, top, size], index) => (
      <span
        key={index}
        className="absolute animate-pulse rounded-full bg-slate-300/40"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    ))}
  </div>
);

export default StarField;
