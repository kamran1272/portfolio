const MonoBlog = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 hover:shadow-2xl bg-white shadow-gray-300 transition-all duration-300">
      <a href={data?.link} target="_blank" rel="noopener noreferrer">
        {/* Blog Image */}
        <div className="overflow-hidden">
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full h-56.5 object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Blog Content */}
        <div className="m-6">
          {/* Date + Comments */}
          <p className="text-[10px] xs:text-[14px] font-normal text-gray-400 mb-2">
            {data?.date} • {data?.comments} Comments{" "}
            {data?.readingTime && `• ${data.readingTime} min read`}
          </p>

          {/* Title */}
          <p className="text-[14px] xs:text-lg font-semibold text-[#333333] leading-snug line-clamp-2">
            {data?.title}
          </p>

          {/* Optional Tag */}
          {data?.tag && (
            <span className="mt-3 inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {data.tag}
            </span>
          )}
        </div>
      </a>
    </div>
  );
};

export default MonoBlog;
