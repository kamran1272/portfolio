const TestimonialTemplate = ({ testimonial }) => {
  return (
    <div className="flex flex-col items-center h-full text-center px-4">
      {/* Testimonial message */}
      <p className="text-xs sm:text-[14px] md:text-[18px] pb-5 sm:pb-8 md:pb-10 max-w-144.25 text-gray-600 italic">
        {testimonial?.message}
      </p>

      {/* Quote */}
      <p className="text-[14px] sm:text-lg font-medium text-gray-800 pb-6 leading-relaxed">
        “{testimonial?.quote}”
      </p>

      {/* Client Info */}
      <div className="flex flex-col items-center">
        {/* Optional Avatar */}
        {testimonial?.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial?.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mb-4 shadow-md"
          />
        )}

        <p className="text-[14px] sm:text-[16px] md:text-lg font-semibold text-gray-900">
          {testimonial?.name}
        </p>
        <p className="text-[13px] sm:text-[15px] text-gray-500">
          {testimonial?.designation}
        </p>
      </div>
    </div>
  );
};

export default TestimonialTemplate;
