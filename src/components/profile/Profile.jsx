import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import SocialMedia from "../common/socialMedia/SocialMedia";
import { siteConfig } from "../../data/siteData";

const Profile = () => {
  return (
    <section
      className={`relative mx-4 xxl:mx-0.5 -bottom-20 lg:-bottom-28 z-10 rounded-2xl bg-white drop-shadow-2xl max-xl:mb-5 shadow-white xl:p-28 lg:p-20 md:p-16 sm:p-10 p-4`}
      id="profile"
    >
      <div className="flex max-md:flex-col justify-between items-center gap-6">
        <div className="xxl:max-w-106 w-auto h-auto xxl:max-h-126">
          <div className="w-90 h-90 mx-auto overflow-hidden rounded-full border-4 border-gray-200 shadow-lg">
            <img
              className="w-full h-full object-contain hover:scale-105 duration-300"
              src={siteConfig.profileImage}
              alt="Portrait of Kamran Khan"
            />
          </div>
          <div className="relative bottom-9">
            <div className="flex justify-center">
              <div className="px-6 max-w-66 py-3 z-50 text-center bg-white rounded-[4px] center shadow-2xl drop-shadow-2xl shadow-white">
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>

        <div className="max-sm:w-full w-[33rem]">
          <h2
            id="profile-title"
            className={`text-2xl xxs:text-3xl sm:text-4xl lg:text-[38px] text-[min(24px,38px)] max-md:text-center font-semibold mb-8`}
          >
            A developer focused on clean delivery, usability, and growth
          </h2>
          <div
            className={`text-xs xs:text-[16px] lg:text-lg font-normal max-md:text-center text-gray-600`}
          >
            <p>
              I specialize in building{" "}
              <span className="bg-highlight">
                responsive and scalable web products
              </span>{" "}
              using <strong>React</strong> and <strong>Laravel</strong>. My
              work combines clean frontend implementation, dependable backend
              structure, and practical SEO improvements that help websites make
              a stronger first impression.
            </p>
            <p className="mt-3">
              Whether the goal is a business website, internal dashboard, or
              portfolio refresh, I focus on making the final result easier to
              trust, easier to use, and easier to maintain.
            </p>
          </div>
          <div className="mt-8 flex max-md:justify-center">
            <a
              className="btn xxs:btn-lg px-6 max-xs:px-2 xxs:py-3 btn-primary text-xs xxs:text-[14px] sm:text-[16px]"
              href="#portfolio"
            >
              Browse projects
            </a>
            <a
              className="btn xxs:btn-lg px-6 max-xs:px-2 xxs:py-3 hover:border-picto-primary bg-white duration-300 transition-all hover:text-picto-primary ms-4 text-xs xxs:text-[14px] sm:text-[16px]"
              href={siteConfig.resumePath}
              download="Kamran_Khan_CV.pdf"
            >
              <FontAwesomeIcon icon={faDownload} /> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
