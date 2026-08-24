import card1 from "../assets/images/portfolio-images/card-1.PNG";
import card2 from "../assets/images/portfolio-images/card-2.png";
import card3 from "../assets/images/portfolio-images/card-3.png";
import card4 from "../assets/images/portfolio-images/card-4.png";
import card5 from "../assets/images/portfolio-images/card-5.png";
import card6 from "../assets/images/portfolio-images/card-6.png";
import card7 from "../assets/images/portfolio-images/card-7.png";
import spotlessGutterCare from "../assets/images/portfolio-images/spotless-gutter-care.png";

export const projects = [
  { id: 1, image: card1, category: "Laravel / Full-Stack", title: "KickZone Sports Management System", description: "A role-based sports platform for managing teams, events, schedules, and user access across a structured admin workflow.", tech: ["Laravel", "MySQL", "Role-based access"], link: "#contact", linkLabel: "Request walkthrough", external: false },
  { id: 2, image: card7, category: "React / Frontend", title: "Ecommerce Frontend Experience", description: "A modern ecommerce interface built to make browsing, discovery, and shopping interactions feel fast and intuitive.", tech: ["React", "Responsive UI", "Product flows"], link: "https://kamran1272.github.io/my-ecommerce-app/", linkLabel: "View live project", external: true, imageClass: "object-contain", imageWrapperClass: "bg-white" },
  { id: 3, image: "https://kamran1272.github.io/restaurant-website/img/f9.jpg", category: "Restaurant / Business Website", title: "Baloch Restaurant", description: "A restaurant platform built around menu browsing, delivery orders, table reservations, and a polished customer-facing experience.", tech: ["Online ordering", "Table reservations", "Responsive UI"], link: "https://kamran1272.github.io/restaurant-website/", linkLabel: "View live project", external: true },
  { id: 4, image: spotlessGutterCare, category: "WordPress / Local SEO", title: "Spotless Gutter Care", description: "A Canadian client project delivered through Upwork, focused on a clean WordPress build, local SEO targeting Kelowna, BC, and strong quote-driven service pages.", tech: ["WordPress", "Local SEO", "Lead generation"], link: "https://spotlessguttercare.com/", linkLabel: "View live project", external: true, imageClass: "object-contain object-top", imageWrapperClass: "bg-[#0d4f82]" },
  { id: 5, image: card2, category: "React / Single-Page App", title: "Hospital Management Dashboard", description: "A healthcare management interface for appointments, records, and staff workflows built with reusable React patterns.", tech: ["React", "Routing", "Hooks"], link: "#contact", linkLabel: "Request walkthrough", external: false },
  { id: 6, image: card3, category: "Laravel / Business System", title: "Pharmacy Management System", description: "A business operations tool for inventory, sales, authentication, and daily store management in one secure workflow.", tech: ["Laravel", "CRUD", "Database queries"], link: "#contact", linkLabel: "Request walkthrough", external: false },
  { id: 7, image: card4, category: "Website Optimization", title: "SEO-Focused Portfolio Refresh", description: "An example of improving a portfolio through better metadata, semantic structure, user clarity, and stronger calls to action.", tech: ["SEO", "Content strategy", "Accessibility"], link: "#contact", linkLabel: "Discuss your website", external: false },
  { id: 8, image: card5, category: "Frontend Systems", title: "Responsive UI Components Library", description: "A reusable collection of interface patterns designed to keep dashboards and business pages consistent and easier to scale.", tech: ["Design systems", "Tailwind CSS", "Reusable UI"], link: "#contact", linkLabel: "Ask about similar work", external: false },
  { id: 9, image: card6, category: "Freelance Delivery", title: "Custom Business Website Builds", description: "Client-ready website delivery focused on clarity, speed, mobile responsiveness, and a professional online presence.", tech: ["Business websites", "Performance", "UI polish"], link: "#contact", linkLabel: "Start a conversation", external: false },
];

export const featuredProjects = [1, 2, 4]
  .map((projectId) => projects.find((project) => project.id === projectId))
  .filter(Boolean);
