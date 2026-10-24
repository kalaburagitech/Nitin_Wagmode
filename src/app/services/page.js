import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import ServicesGrid from "@/components/home/ServicesGrid";
import ContactBand from "@/components/home/ContactBand";

export const metadata = generateMetadata({
  title: "Services",
  description: `What ${profile.fullName} builds: React and Next.js web applications, React Native mobile apps, state/auth/API integration, and frontend performance work.`,
  path: "/services",
  keywords: ["Frontend Development Services", "React Native App Development", "Next.js Development"],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHeader
        crumbs={[{ label: "Services" }]}
        eyebrow="What I do"
        title="Services"
        intro="Frontend engineering for web and mobile products — from component architecture to authentication, API integration, and performance. Available for full-time roles and freelance work."
      />
      <section aria-label="Services" className="shell py-16">
        <ServicesGrid headingLevel="h2" />
      </section>
      <ContactBand />
    </>
  );
}
