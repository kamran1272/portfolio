import TestimonialTemplate from "./TestimonialTemplate";
import { expectations } from "../../data/siteData";

const Testimonial = () => {
  return (
    <section id="testimonials" className="bg-[#f9f9f9] py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="section-title text-3xl sm:text-4xl font-semibold">
          What It Is Like to Work With Me
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Instead of placeholder testimonials, here is the standard I aim to
          bring to every project and collaboration.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
        {expectations.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <TestimonialTemplate testimonial={testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
