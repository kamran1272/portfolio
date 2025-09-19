import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import TestimonialTemplate from "./TestimonialTemplate";
import "./testimonial.css";

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
    <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
      <div className="w-full h-full cursor-grab">
        <p className="section-title mb-6 text-center">Testimonials</p>
        <Swiper
          id="testimonialSwiper"
          spaceBetween={30}
          navigation={false}
          pagination={{ clickable: true }}
          modules={[EffectFade, Navigation, Pagination]}
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialTemplate testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
