import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Hero from "../components/hero/Hero";
import Projects from "../components/projects/Projects";
import Capabilities from "../components/capabilities/Capabilities";
import TechStack from "../components/tech/TechStack";
import About from "../components/about/About";
import GitHubActivity from "../components/github/GitHubActivity";
import Contact from "../components/contact/Contact";
import BackgroundGlow from "../components/background/BackgroundGlow";
import StarField from "../components/background/StarField";

const Home = () => {
  const location = useLocation();

  // When arriving from another route (e.g. the projects page) with a
  // requested section, scroll to it once the sections are mounted.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return undefined;

    const timer = setTimeout(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Seo />

      <div className="relative isolate overflow-hidden">
        <BackgroundGlow />
        <StarField />
        <Hero />
        <Projects />
        <Capabilities />
        <TechStack />
        <About />
        <GitHubActivity />
        <Contact />
      </div>
    </>
  );
};

export default Home;
