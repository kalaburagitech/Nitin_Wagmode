import { profile } from "@/data/profile";

export const socialMediaLinks = {
  github: {
    name: "GitHub",
    icon: "FaGithub",
    link: profile.socials.github,
  },
  linkedin: {
    name: "LinkedIn",
    icon: "FaLinkedin",
    link: profile.socials.linkedin,
  },
  email: {
    name: "Email",
    icon: "MdEmail",
    link: `mailto:${profile.email}`,
  },
  phone: {
    name: "Phone",
    icon: "FaPhone",
    link: profile.phoneHref,
  },
};

// Links without a URL (e.g. GitHub before one is configured) are omitted.
export const socialLinksArray = Object.values(socialMediaLinks).filter(
  (social) => Boolean(social.link)
);
