import card1 from "../assets/images/portfolio-images/card-1.PNG";
import card2 from "../assets/images/portfolio-images/card-2.png";
import card3 from "../assets/images/portfolio-images/card-3.png";
import card4 from "../assets/images/portfolio-images/card-4.png";
import card5 from "../assets/images/portfolio-images/card-5.png";
import card6 from "../assets/images/portfolio-images/card-6.png";
import card7 from "../assets/images/portfolio-images/card-7.png";
import spotlessGutterCare from "../assets/images/portfolio-images/spotless-gutter-care.png";
import blog1 from "../assets/images/blog/blog-1.jpg";
import blog2 from "../assets/images/blog/blog-2.jpg";
import blog3 from "../assets/images/blog/blog-3.jpg";
import personHero from "../assets/images/person.jpg";
import personProfile from "../assets/images/person2.jpg";

export const siteConfig = {
  siteUrl: "https://kamran1272.github.io/portfolio/",
  siteName: "Kamran Khan Portfolio",
  personName: "Kamran Khan",
  jobTitle: "Full-Stack Web Developer and Local SEO Specialist",
  shortTitle: "Full-Stack Developer",
  location: "Lahore, Pakistan",
  email: "kamranofficial7212@gmail.com",
  phoneDisplay: "+92 330 7162505",
  phoneHref: "tel:+923307162505",
  whatsappLink:
    "https://wa.me/923307162505?text=Hi%2C%20I%20want%20to%20discuss%20a%20project%20with%20you.",
  githubUrl: "https://github.com/kamran1272",
  linkedinUrl: "https://www.linkedin.com/in/kamran-khan-4477a3383",
  instagramUrl:
    "https://www.instagram.com/kamran_khan728?igsh=MXA2MWJlaTRsbHJpZQ==",
  facebookUrl: "https://www.facebook.com/share/1CXiXJKDm5/",
  tiktokUrl:
    "https://www.tiktok.com/@kamran_magsi12?_t=ZS-8zqoE9Zq4X3&_r=1",
  resumePath: `${import.meta.env.BASE_URL}Kamran_Khan_CV.pdf`,
  title: "Kamran Khan | Full-Stack Web Developer & Local SEO Specialist",
  description:
    "Kamran Khan builds fast, responsive React and Laravel websites with clean UI, strong UX, and SEO foundations that help businesses grow online.",
  keywords: [
    "Kamran Khan",
    "portfolio website",
    "full-stack web developer",
    "React developer",
    "Laravel developer",
    "frontend developer",
    "local SEO specialist",
    "Pakistan web developer",
    "freelance web developer",
    "responsive website developer",
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/kamran1272" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kamran-khan-4477a3383",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/kamran_khan728?igsh=MXA2MWJlaTRsbHJpZQ==",
    },
    { label: "Facebook", href: "https://www.facebook.com/share/1CXiXJKDm5/" },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@kamran_magsi12?_t=ZS-8zqoE9Zq4X3&_r=1",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/923307162505?text=Hi%2C%20I%20want%20to%20discuss%20a%20project%20with%20you.",
    },
  ],
  navigation: [
    { label: "Home", href: "#introduction" },
    { label: "About", href: "#profile" },
    { label: "Process", href: "#work-process" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Insights", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  heroImage: personHero,
  profileImage: personProfile,
};

export const stats = [
  { id: 1, title: "Years of Experience", description: "2+" },
  { id: 2, title: "Projects Built", description: "10+" },
  { id: 3, title: "Core Focus Areas", description: "3" },
];

export const workProcess = [
  {
    id: 1,
    title: "Discovery and planning",
    description:
      "I start by understanding business goals, user needs, and technical requirements so the project has a clear roadmap from day one.",
  },
  {
    id: 2,
    title: "Interface and frontend development",
    description:
      "I turn ideas into responsive interfaces with React, reusable components, and clean implementation that feels polished on every device.",
  },
  {
    id: 3,
    title: "Backend and integrations",
    description:
      "For full-stack projects, I build Laravel APIs, connect databases, and make sure data flows reliably across the product.",
  },
  {
    id: 4,
    title: "SEO and performance optimization",
    description:
      "I improve metadata, structure, page speed, mobile experience, and local SEO signals so the site performs better for both users and search engines.",
  },
  {
    id: 5,
    title: "Testing, launch, and support",
    description:
      "Before launch, I verify quality across devices and keep the handoff clean so the website is stable, professional, and easy to maintain.",
  },
];

export const services = [
  {
    id: 1,
    title: "React Frontend Development",
    description:
      "Responsive interfaces, reusable component systems, clean state management, and smooth user journeys tailored to your product goals.",
  },
  {
    id: 2,
    title: "Laravel Full-Stack Solutions",
    description:
      "Custom business applications, API-driven platforms, authentication flows, and database-backed systems built with long-term maintainability in mind.",
  },
  {
    id: 3,
    title: "Landing Pages and Business Websites",
    description:
      "Professional pages for founders, agencies, and local businesses that clearly communicate value and turn visitors into enquiries.",
  },
  {
    id: 4,
    title: "Technical SEO Improvements",
    description:
      "Metadata, semantic structure, crawlability, speed, and content formatting improvements that give your website a stronger SEO foundation.",
  },
  {
    id: 5,
    title: "Local SEO Support",
    description:
      "On-page recommendations and visibility improvements designed to help businesses show up more clearly in local search results.",
  },
  {
    id: 6,
    title: "Maintenance and Iteration",
    description:
      "Ongoing updates, bug fixes, UI refinements, and feature improvements so your site keeps getting better after launch.",
  },
];

export const projects = [
  {
    id: 1,
    image: card1,
    category: "Laravel / Full-Stack",
    title: "KickZone Sports Management System",
    description:
      "A role-based sports platform for managing teams, events, schedules, and user access across a structured admin workflow.",
    tech: ["Laravel", "MySQL", "Role-based access"],
    link: "#contact",
    linkLabel: "Request walkthrough",
    external: false,
  },
  {
    id: 2,
    image: card7,
    category: "React / Frontend",
    title: "Ecommerce Frontend Experience",
    description:
      "A modern ecommerce interface built to make browsing, discovery, and shopping interactions feel fast and intuitive.",
    tech: ["React", "Responsive UI", "Product flows"],
    link: "https://kamran1272.github.io/my-ecommerce-app/",
    linkLabel: "View live project",
    external: true,
    imageClass: "object-contain",
    imageWrapperClass: "bg-white",
  },
  {
    id: 3,
    image: "https://kamran1272.github.io/restaurant-website/img/f9.jpg",
    category: "Restaurant / Business Website",
    title: "Baloch Restaurant",
    description:
      "A restaurant platform built around menu browsing, delivery orders, table reservations, and a polished customer-facing experience.",
    tech: ["Online ordering", "Table reservations", "Responsive UI"],
    link: "https://kamran1272.github.io/restaurant-website/",
    linkLabel: "View live project",
    external: true,
  },
  {
    id: 4,
    image: spotlessGutterCare,
    category: "WordPress / Local SEO",
    title: "Spotless Gutter Care",
    description:
      "A Canadian client project delivered through Upwork, focused on a clean WordPress build, local SEO targeting Kelowna, BC, and strong quote-driven service pages.",
    tech: ["WordPress", "Local SEO", "Lead generation"],
    link: "https://spotlessguttercare.com/",
    linkLabel: "View live project",
    external: true,
    imageClass: "object-contain object-top",
    imageWrapperClass: "bg-[#0d4f82]",
  },
  {
    id: 5,
    image: card2,
    category: "React / Single-Page App",
    title: "Hospital Management Dashboard",
    description:
      "A healthcare management interface for appointments, records, and staff workflows built with reusable React patterns.",
    tech: ["React", "Routing", "Hooks"],
    link: "#contact",
    linkLabel: "Request walkthrough",
    external: false,
  },
  {
    id: 6,
    image: card3,
    category: "Laravel / Business System",
    title: "Pharmacy Management System",
    description:
      "A business operations tool for inventory, sales, authentication, and daily store management in one secure workflow.",
    tech: ["Laravel", "CRUD", "Database queries"],
    link: "#contact",
    linkLabel: "Request walkthrough",
    external: false,
  },
  {
    id: 7,
    image: card4,
    category: "Website Optimization",
    title: "SEO-Focused Portfolio Refresh",
    description:
      "An example of improving a portfolio through better metadata, semantic structure, user clarity, and stronger calls to action.",
    tech: ["SEO", "Content strategy", "Accessibility"],
    link: "#contact",
    linkLabel: "Discuss your website",
    external: false,
  },
  {
    id: 8,
    image: card5,
    category: "Frontend Systems",
    title: "Responsive UI Components Library",
    description:
      "A reusable collection of interface patterns designed to keep dashboards and business pages consistent and easier to scale.",
    tech: ["Design systems", "Tailwind CSS", "Reusable UI"],
    link: "#contact",
    linkLabel: "Ask about similar work",
    external: false,
  },
  {
    id: 9,
    image: card6,
    category: "Freelance Delivery",
    title: "Custom Business Website Builds",
    description:
      "Client-ready website delivery focused on clarity, speed, mobile responsiveness, and a professional online presence.",
    tech: ["Business websites", "Performance", "UI polish"],
    link: "#contact",
    linkLabel: "Start a conversation",
    external: false,
  },
];

export const insights = [
  {
    id: 1,
    image: blog1,
    tag: "React",
    date: "March 30, 2026",
    title: "What makes a portfolio feel professional to real clients",
    excerpt:
      "Strong portfolios do more than look nice. They explain value quickly, show proof, and guide the visitor to the next step.",
    link: "#contact",
    linkLabel: "Discuss your portfolio",
  },
  {
    id: 2,
    image: blog2,
    tag: "SEO",
    date: "March 30, 2026",
    title: "Simple SEO foundations every business website should have",
    excerpt:
      "Metadata, semantic headings, internal linking, page speed, and clear service-focused copy are usually the first high-impact wins.",
    link: "#contact",
    linkLabel: "Ask about SEO help",
  },
  {
    id: 3,
    image: blog3,
    tag: "Laravel",
    date: "March 30, 2026",
    title: "Why scalable full-stack work starts with clean structure",
    excerpt:
      "Clear architecture, thoughtful naming, and maintainable frontend and backend patterns save time long after launch.",
    link: "#contact",
    linkLabel: "Talk through your project",
  },
];

export const expectations = [
  {
    id: 1,
    title: "Clear communication",
    description:
      "You get straightforward updates, realistic timelines, and decisions explained in plain language instead of vague technical noise.",
  },
  {
    id: 2,
    title: "Practical implementation",
    description:
      "I focus on solutions that improve the product today while keeping the codebase maintainable for future features.",
  },
  {
    id: 3,
    title: "Business-first thinking",
    description:
      "The goal is not just shipping screens. It is building something that supports trust, visibility, and measurable business outcomes.",
  },
];

export const techStack = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Laravel",
  "Tailwind CSS",
  "Bootstrap",
  "MySQL",
  "Node.js",
  "GitHub",
  "Figma",
  "REST APIs",
  "Responsive Design",
  "Local SEO",
];
