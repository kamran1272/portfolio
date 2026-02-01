import img1 from "../../assets/images/blog/blog-1.jpg";
import img2 from "../../assets/images/blog/blog-2.jpg";
import img3 from "../../assets/images/blog/blog-3.jpg";
import img4 from "../../assets/images/blog/blog-4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import MonoBlog from "./MonoBlog";
import "swiper/css";
import "swiper/css/pagination";
import "./blog.css";

// SwiperJS breakpoints for responsive carousel
const custom_breakpoints = {
  640: {
    slidesPerView: 1,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  1400: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
};

const blogData = [
  {
    id: 1,
    image: img1,
    date: "22 Oct, 2020",
    comments: 246,
    title: "Designing Engaging User Interfaces for Modern Web Apps",
    link: "#",
  },
  {
    id: 2,
    image: img2,
    date: "22 Oct, 2020",
    comments: 246,
    title: "Tips for Effective Dashboard Layouts and Usability",
    link: "#",
  },
  {
    id: 3,
    image: img3,
    date: "22 Oct, 2020",
    comments: 246,
    title: "How to Visualize Data for Better Product Decisions",
    link: "#",
  },
  {
    id: 4,
    image: img4,
    date: "22 Oct, 2020",
    comments: 246,
    title: "Responsive Design: Adapting to All Devices Seamlessly",
    link: "#",
  },
  {
    id: 5,
    image: img2,
    date: "22 Oct, 2020",
    comments: 246,
    title: "Streamlining Workflows with UI/UX Best Practices",
    link: "#",
  },
  {
    id: 6,
    image: img1,
    date: "22 Oct, 2020",
    comments: 246,
    title: "Optimizing Interface Components for Performance",
    link: "#",
  },
];

const Blog = () => {
  return (
    <section
      className="content max-w-[1300px] mx-auto py-24 px-4"
      id="blog"
    >
      {/* Section Heading */}
      <div className="text-center mb-16">
        <p className="section-title text-3xl md:text-4xl font-semibold mb-4">
          Blog & Insights
        </p>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Explore my latest articles on Full-Stack development, Local SEO strategies, and web design best practices.
          Gain insights on building scalable applications and improving online visibility for businesses.
        </p>
      </div>

      {/* Blog Carousel */}
      <Swiper
        grabCursor={true}
        breakpoints={custom_breakpoints}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="blog-swiper"
      >
        {blogData.map((data) => (
          <SwiperSlide key={data.id} className="mb-8">
            <MonoBlog data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Blog;
