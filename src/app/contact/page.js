import { FiArrowUpRight, FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import { contactCopy } from "@/data/contact";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import SocialLinks from "@/components/ui/SocialLinks";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = generateMetadata({
  title: "Contact",
  description: `Contact ${profile.fullName}, ${profile.role} based in ${profile.city} — open to frontend roles, freelance projects, relocation across India, and remote work.`,
  path: "/contact",
  keywords: ["Hire Frontend Developer", "Hire React Developer", "Contact Nitin Wagmode"],
});

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: FiMail },
  {
    label: "WhatsApp",
    value: `Chat on WhatsApp · ${profile.phone}`,
    href: buildWhatsAppUrl(),
    Icon: FaWhatsapp,
    external: true,
  },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, Icon: FiPhone },
  { label: "Location", value: profile.location, Icon: FiMapPin },
  { label: "Availability", value: profile.workPreference, Icon: FiClock },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader crumbs={[{ label: "Contact" }]} eyebrow="Contact" title={contactCopy.title} intro={contactCopy.intro} />

      <div className="shell grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <aside aria-labelledby="channels-title">
          <h2 id="channels-title" className="eyebrow font-mono">
            Direct
          </h2>
          <ul className="mt-5 space-y-3">
            {channels.map(({ label, value, href, Icon, external }) => {
              const content = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block break-words text-sm text-ink">{value}</span>
                  </span>
                  {href && <FiArrowUpRight className="ml-auto shrink-0 text-muted" aria-hidden="true" />}
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="panel flex items-center gap-4 p-4 transition-colors hover:border-accent/50"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="panel flex items-center gap-4 p-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <SocialLinks className="mt-6" />
        </aside>

        <section aria-labelledby="form-title" className="panel p-6 sm:p-10">
          <h2 id="form-title" className="text-2xl font-semibold">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-muted">
            You&apos;ll get an automatic confirmation email once your message reaches me. Fields marked optional can be left blank.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
