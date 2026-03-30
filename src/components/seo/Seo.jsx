import { useEffect } from "react";
import { siteConfig } from "../../data/siteData";

const setMetaTag = (attribute, key, content) => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const setLinkTag = (rel, href) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const setStructuredData = (id, data) => {
  let tag = document.head.querySelector(`#${id}`);

  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = id;
    document.head.appendChild(tag);
  }

  tag.textContent = JSON.stringify(data);
};

const Seo = () => {
  useEffect(() => {
    const {
      title,
      description,
      siteUrl,
      siteName,
      personName,
      jobTitle,
      location,
      email,
      phoneDisplay,
      socialLinks,
      keywords,
    } = siteConfig;
    const imageUrl = `${siteUrl}logo.jpg`;

    document.title = title;

    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords.join(", "));
    setMetaTag("name", "author", personName);
    setMetaTag("name", "robots", "index, follow");
    setMetaTag("name", "theme-color", "#132238");

    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", siteUrl);
    setMetaTag("property", "og:site_name", siteName);
    setMetaTag("property", "og:image", imageUrl);
    setMetaTag("property", "og:locale", "en_PK");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", imageUrl);

    setLinkTag("canonical", siteUrl);

    setStructuredData("structured-data-person", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personName,
      jobTitle,
      image: imageUrl,
      url: siteUrl,
      email,
      telephone: phoneDisplay,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      knowsAbout: [
        "React development",
        "Laravel development",
        "Frontend engineering",
        "Full-stack web development",
        "Technical SEO",
        "Local SEO",
      ],
      sameAs: socialLinks.map((link) => link.href),
      worksFor: {
        "@type": "Organization",
        name: personName,
      },
      description: `${personName} is a ${jobTitle} based in ${location}.`,
    });

    setStructuredData("structured-data-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description,
      publisher: {
        "@type": "Person",
        name: personName,
      },
      inLanguage: "en",
    });
  }, []);

  return null;
};

export default Seo;
