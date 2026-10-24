import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { profile } from "@/data/profile";

// Contact/social links from profile.js; entries without a URL are skipped.
export const socialLinks = [
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: FiLinkedin, external: true },
  { label: "GitHub", href: profile.socials.github, Icon: FiGithub, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: FiMail },
  { label: "Phone", href: profile.phoneHref, Icon: FiPhone },
].filter((link) => link.href);

export default function SocialLinks({ className = "" }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid h-10 w-10 place-items-center rounded-full border hairline text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
