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
  return socialIcons.map((item, index) => (
    <a
      href={item.link}
      className="text-picto-primary hover:bg-picto-primary p-2 pt-3 xs:p-2.5 xs:pt-3.75 sm:pt-4 md:pt-5 sm:p-3 md:p-3.75 hover:text-white rounded-md"
      key={index}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={item.icon}
        className="text-xl w-4.5 aspect-square"
      />
    </a>
  ));
};

export default SocialMedia;
