import Link from "next/link";
import { profile } from "@/data/profile";
import { navigationItems } from "@/data/navigation";
import SocialLinks from "@/components/ui/SocialLinks";
import BackToTop from "./BackToTop";

const moreLinks = [
  { name: "Skills", path: "/skills" },
  { name: "Services", path: "/services" },
  { name: "Résumé (PDF)", path: profile.resumeUrl, download: true },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t hairline">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-ink">{profile.fullName}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            {profile.role} in {profile.city}. {profile.tagline}.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Pages</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="link-underline text-body hover:text-ink">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">More</p>
          <ul className="mt-4 space-y-2 text-sm">
            {moreLinks.map((item) => (
              <li key={item.path}>
                {item.download ? (
                  <a href={item.path} download className="link-underline text-body hover:text-ink">
                    {item.name}
                  </a>
                ) : (
                  <Link href={item.path} className="link-underline text-body hover:text-ink">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a
                href={profile.freelance.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-body hover:text-ink"
              >
                {profile.freelance.name}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="shell flex flex-col items-start justify-between gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
