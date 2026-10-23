import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import Contact from "@/mainPages/portfolioPages/Contact";

export const metadata = generateMetadata({
  title: "Contact",
  description: `Contact ${profile.fullName}, ${profile.role} based in ${profile.city} — open to frontend roles, freelance projects, relocation across India, and remote work.`,
  path: "/contact",
  keywords: ["Hire Frontend Developer", "Hire React Developer", "Contact Nitin Wagmode"],
  type: "website",
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Contact />
    </>
  );
}
