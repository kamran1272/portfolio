const MonoBlog = ({ data }) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 hover:shadow-2xl bg-white shadow-gray-300 transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={data?.image}
          alt={data?.title}
          loading="lazy"
          className="w-full h-56.5 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="m-6">
        <p className="text-[10px] xs:text-[14px] font-normal text-gray-400 mb-2">
          {data?.date}
        </p>

        <h3 className="text-[14px] xs:text-lg font-semibold text-[#333333] leading-snug">
          {data?.title}
        </h3>

        <p className="mt-3 text-sm text-gray-600">{data?.excerpt}</p>

        <div className="mt-4 flex items-center justify-between gap-4">
          {data?.tag && (
            <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {data.tag}
            </span>
          )}
          <a
            href={data?.link}
            className="text-sm font-semibold text-picto-primary hover:text-picto-primary-dark"
          >
            {data?.linkLabel}
          </a>
        </div>
      </div>
    </article>
  );
};

export default MonoBlog;
