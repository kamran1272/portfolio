const TestimonialTemplate = ({ testimonial }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      {/* Testimonial message */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 italic mb-6 sm:mb-8 max-w-[36rem] mx-auto">
        {testimonial?.message}
      </p>

      {/* Quote */}
      <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 leading-relaxed mb-8 max-w-[36rem] mx-auto">
        “{testimonial?.quote}”
      </p>

      {/* Client Info */}
      <div className="flex flex-col items-center justify-center">
        {/* Optional Avatar */}
        {testimonial?.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial?.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mb-4 shadow-md"
          />
        )}

        <p className="text-lg sm:text-xl font-semibold text-gray-900">
          {testimonial?.name}
        </p>
        <p className="text-sm sm:text-base text-gray-500">
          {testimonial?.designation}
        </p>
      </div>
    </div>
  );
};

export default TestimonialTemplate;
