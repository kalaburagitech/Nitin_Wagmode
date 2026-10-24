// seo-utils.js - SEO helpers for consistent metadata and structured data.
import { profile, education, SITE_URL } from "@/data/profile";
import { experiences } from "@/data/experience";
import { coreSkills } from "@/data/skills";

export const BASE_URL = SITE_URL;
export const DEFAULT_OG_IMAGE = "/og-image.png";
const SITE_NAME = `${profile.fullName} — Portfolio`;

function absoluteUrl(value) {
  if (!value) return BASE_URL;
  return value.startsWith("http") ? value : `${BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

/**
 * Build page metadata. `title` is the page-specific part; the root layout's
 * title template appends the site owner's name.
 */
export function generateMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  type = "website",
  robots = {},
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | ${profile.fullName}`
    : `${profile.fullName} | ${profile.role}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImage);
  const isSvgImage = imageUrl.endsWith(".svg");
  // Social platforms don't render SVG previews; fall back to the PNG card.
  const socialImage = isSvgImage ? absoluteUrl(DEFAULT_OG_IMAGE) : imageUrl;

  return {
    title,
    description,
    keywords: [
      profile.fullName,
      "Frontend Developer",
      "React.js Developer",
      "Next.js Developer",
      "React Native Developer",
      "TypeScript",
      "Bengaluru",
      ...keywords,
    ],
    authors: [{ name: profile.fullName, url: BASE_URL }],
    creator: profile.fullName,
    publisher: profile.fullName,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt || `${profile.fullName} — ${title || profile.role}`,
          type: "image/png",
        },
      ],
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
    robots: noIndex
      ? { index: false, follow: true, ...robots }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
          ...robots,
        },
    alternates: {
      canonical: url,
    },
  };
}

/** JSON-LD Person schema built from src/data. */
export function getPersonSchema() {
  const sameAs = [profile.socials.linkedin, profile.socials.github].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    givenName: profile.firstName,
    familyName: profile.lastName,
    url: BASE_URL,
    image: absoluteUrl(profile.profileSquareUrl),
    sameAs,
    jobTitle: profile.role,
    worksFor: {
      "@type": "Organization",
      name: experiences[0].company,
      url: experiences[0].website,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education[0].place.split(",")[0],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressRegion: profile.region,
      addressCountry: "IN",
    },
    email: `mailto:${profile.email}`,
    knowsAbout: coreSkills,
    description: profile.summary,
  };
}

/** JSON-LD WebSite schema. */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: `Portfolio of ${profile.fullName}, ${profile.role}.`,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: profile.fullName,
    },
  };
}

/** JSON-LD BreadcrumbList from [{ name, path }]. */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** JSON-LD BlogPosting schema. */
export function getArticleSchema(article) {
  const author = {
    "@type": "Person",
    name: article.author || profile.fullName,
    url: BASE_URL,
  };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.image || DEFAULT_OG_IMAGE),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    url: article.url || BASE_URL,
    author,
    publisher: author,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url || BASE_URL,
    },
    wordCount: article.wordCount || 0,
    articleSection: article.category || "Technology",
    keywords: article.keywords || [],
    isAccessibleForFree: true,
    inLanguage: "en",
  };
}
