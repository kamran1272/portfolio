import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faTiktok,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siteConfig } from "../../../data/siteData";

const socialIcons = [
  { icon: faGithub, label: "GitHub", link: siteConfig.githubUrl },
  { icon: faLinkedin, label: "LinkedIn", link: siteConfig.linkedinUrl },
  { icon: faInstagram, label: "Instagram", link: siteConfig.instagramUrl },
  { icon: faFacebookF, label: "Facebook", link: siteConfig.facebookUrl },
  { icon: faWhatsapp, label: "WhatsApp", link: siteConfig.whatsappLink },
  { icon: faTiktok, label: "TikTok", link: siteConfig.tiktokUrl },
];

const SocialMedia = () => {
  return (
    <div className="flex justify-center lg:justify-start gap-4">
      {socialIcons.map((item) => (
        <a
          href={item.link}
          key={item.label}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${item.label}`}
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
