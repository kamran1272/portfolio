import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import WorkTogether from "../components/workTogether/WorkTogether";
import Blog from "../components/blog/Blog";
import Profession from "../components/profession/Profession";
import HappyClients from "../components/happyClients/HappyClients";
import Testimonial from "../components/testimonial/Testimonial";
import Contact from "../components/contact/Contact";
import Seo from "../components/seo/Seo";
import "../../index.css";

const Home = () => {
  return (
    <>
      <Seo />
      <div className="relative">
        <div className="introduction-profile-background">
          <div className="content">
            <Introduction />
            <Profile />
          </div>
        </div>
        <div className="bg-soft-white pt-30">
          <WorkProcess />
        </div>
        <div className="bg-soft-white">
          <Profession />
        </div>
        <Portfolio />
        <HappyClients />
        <div className="blog-background">
          <Blog />
        </div>
        <Testimonial />
        <div className="bg-gray-900">
          <WorkTogether />
        </div>
        <Contact />
      </div>
    </>
  );
};

export default Home;
