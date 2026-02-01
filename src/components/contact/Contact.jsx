import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../common/socialMedia/SocialMedia";

const addressData = [
  {
    icon: faLocationDot,
    title: "Address",
    description: "Lahore, Pakistan",
    link: "https://www.google.com/maps?q=Lahore,+Pakistan",
  },
  {
    icon: faEnvelope,
    title: "Email",
    description: "kamranofficial7212@gmail.com",
    link: "mailto:kamranofficial7212@gmail.com",
  },
  {
    icon: faPhone,
    title: "Phone",
    description: "+92 330 7162505",
    link: "tel:+923307162505",
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

          {/* Left Section - Info */}
          <div className="flex-1 flex flex-col justify-start">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#132238] text-center lg:text-left">
              Let’s discuss your Project
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              I'm available for freelance work. Drop me a line if you have a project you think I'd be a good fit for.
            </p>

            {/* Address cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-10">
              {addressData.map((item, index) => (
                <Address
                  item={item}
                  key={index}
                  style="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                />
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-6 text-center lg:text-left">
              <SocialMedia />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="flex-1 w-full">
            <Form />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
