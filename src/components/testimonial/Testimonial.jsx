import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import TestimonialTemplate from "./TestimonialTemplate";

const testimonialData = [
  {
    message:
      "Kamran has been a reliable development partner, always delivering high-quality work on time.",
    quote: `From planning to execution, his attention to detail and strong technical expertise made our project a success. The final product was polished, scalable, and exceeded expectations.`,
    name: "Sarah Johnson",
    designation: "Product Manager, TechNova Solutions",
  },
  {
    message:
      "His expertise in React.js and Laravel helped us scale our web platform seamlessly.",
    quote: `Kamran quickly understood our requirements and built a solution that not only looked great but also performed flawlessly. His ability to blend UI/UX with functionality is impressive.`,
    name: "Michael Lee",
    designation: "CTO, BrightWave Digital",
  },
  {
    message:
      "Professional, creative, and dedicated — working with Kamran was a fantastic experience.",
    quote: `He revamped our existing website into a modern, user-friendly platform that boosted customer engagement significantly. His communication and problem-solving skills set him apart.`,
    name: "Emma Davis",
    designation: "CEO, NextGen Enterprises",
  },
];

const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="bg-[#f9f9f9] py-20 px-4 md:px-8"
    >
      {/* Section Title */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="section-title text-3xl sm:text-4xl font-semibold">
          Testimonials
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Hear from clients and collaborators about their experience working with me.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="max-w-5xl mx-auto">
        <Swiper
          modules={[EffectFade, Pagination, Autoplay]}
          effect="fade"
          slidesPerView={1}
          centeredSlides={true}   // <-- Center slides
          spaceBetween={40}
          pagination={{ clickable: true }}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 5000, // 5 seconds
            disableOnInteraction: false,
          }}
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-xl text-center transition-transform duration-300 hover:scale-[1.02]">
                <TestimonialTemplate testimonial={testimonial} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
