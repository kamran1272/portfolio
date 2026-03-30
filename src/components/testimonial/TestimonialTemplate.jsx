const TestimonialTemplate = ({ testimonial }) => {
  return (
    <article className="flex flex-col items-center justify-center h-full text-center px-2">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
        {testimonial?.title}
      </h3>
      <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
        {testimonial?.description}
      </p>
    </article>
  );
};

export default TestimonialTemplate;
