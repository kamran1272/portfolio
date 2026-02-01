import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Update with your actual profile links
const socialIcons = [
  { icon: faFacebookF, link: "https://www.facebook.com/share/1CXiXJKDm5/" },
  { icon: faInstagram, link: "https://www.instagram.com/kamran_khan728?igsh=MXA2MWJlaTRsbHJpZQ==" },
  { icon: faLinkedin, link: "https://www.linkedin.com/in/kamran-khan-4477a3383" },
  { icon: faWhatsapp, link: "https://wa.me/923307162505" },
  { icon: faTiktok, link: "https://www.tiktok.com/@kamran_magsi12?_t=ZS-8zqoE9Zq4X3&_r=1" },
];

const SocialMedia = () => {
  return (
    <div className="flex justify-center lg:justify-start gap-4">
      {socialIcons.map((item, index) => (
        <a
          href={item.link}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white text-picto-primary rounded-full shadow-md hover:bg-picto-primary hover:text-white transition-all duration-300"
        >
          <FontAwesomeIcon
            icon={item.icon}
            className="text-base sm:text-lg"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
