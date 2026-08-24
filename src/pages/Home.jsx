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
  return (
    <>
      <Seo />

      <main className="relative isolate overflow-hidden">
        <BackgroundGlow />
        <StarField />
        <Hero />
        <Projects />
        <Capabilities />
        <TechStack />
        <About />
        <GitHubActivity />
        <Contact />
      </main>
    </>
  );
};

export default Home;
