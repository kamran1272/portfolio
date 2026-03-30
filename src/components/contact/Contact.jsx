import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../common/socialMedia/SocialMedia";
import { siteConfig } from "../../data/siteData";

const addressData = [
  {
    icon: faLocationDot,
    title: "Address",
    description: siteConfig.location,
    link: "https://www.google.com/maps?q=Lahore,+Pakistan",
  },
  {
    icon: faEnvelope,
    title: "Email",
    description: siteConfig.email,
    link: `mailto:${siteConfig.email}`,
  },
  {
    icon: faPhone,
    title: "Phone",
    description: siteConfig.phoneDisplay,
    link: siteConfig.phoneHref,
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="content max-w-[1200px] mx-auto py-24 px-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <div className="flex-1 flex flex-col justify-start">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#132238] text-center lg:text-left">
              Let&apos;s discuss your project
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              If you need a professional website, a React frontend, Laravel
              development, or SEO improvements, send me the details and I will
              get back to you.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-10">
              {addressData.map((item) => (
                <Address item={item} key={item.title} />
              ))}
            </div>

            <div className="mt-6 text-center lg:text-left">
              <SocialMedia />
            </div>
          </div>

          <div className="flex-1 w-full">
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
