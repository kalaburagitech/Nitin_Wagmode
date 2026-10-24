import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { profile } from "@/data/profile";
import { navigationItems } from "@/data/navigation";

export const metadata = {
  title: "Page not found",
  description: `The page you're looking for doesn't exist or has moved. Return to the portfolio of ${profile.fullName}, ${profile.role}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative flex min-h-[80vh] flex-col justify-center pt-[var(--header-h)]">
        <p className="font-mono text-sm text-accent">Error 404</p>
        <h1 className="mt-4 max-w-2xl text-5xl font-semibold sm:text-6xl">This page took a different route.</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          The link may be broken or the page may have moved. Try one of these instead:
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="chip px-4 py-2 text-sm hover:border-accent hover:text-accent">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="btn-primary mt-10 self-start">
          <FiArrowLeft aria-hidden="true" /> Back to home
        </Link>
      </div>
    </section>
  );
}
