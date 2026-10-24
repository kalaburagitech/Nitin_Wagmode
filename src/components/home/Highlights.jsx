import { achievements } from "@/data/achievements";
import { profile } from "@/data/profile";

export default function Highlights() {
  const items = [
    {
      value: `${profile.experienceYears}+`,
      label: "years building React, Next.js, and React Native apps",
      context: "Product companies and freelance work",
    },
    ...achievements.slice(0, 3),
  ];

  return (
    <section aria-label="Highlights" className="shell">
      <dl className="grid gap-px overflow-hidden rounded-2xl border hairline bg-[rgb(var(--line)/var(--line-alpha))] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col bg-raised p-6 sm:p-7">
            <dt className="mt-2 text-sm leading-6 text-body">{item.label}</dt>
            <dd className="order-first font-display text-4xl font-semibold text-ink">{item.value}</dd>
            <dd className="mt-1 text-xs text-muted">{item.context}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
