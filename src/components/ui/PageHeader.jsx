import Link from "next/link";

// Top-of-page header for inner routes: breadcrumb, title, and intro on the
// blueprint grid. `crumbs` excludes Home, which is always first.
export default function PageHeader({ eyebrow, title, intro, crumbs = [], children }) {
  return (
    <header className="relative overflow-hidden border-b hairline pt-[calc(var(--header-h)+3rem)] pb-14 sm:pb-20">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {last || !crumb.href ? (
                    <span aria-current={last ? "page" : undefined} className="text-ink">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-accent">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mt-10">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
