import { services } from "@/data/services";
import Reveal from "@/components/motion/Reveal";

export default function ServicesGrid({ headingLevel = "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border hairline bg-[rgb(var(--line)/var(--line-alpha))] md:grid-cols-2">
      {services.map((service, i) => (
        <li key={service.id} className="bg-canvas">
          <Reveal delay={i * 0.05} className="flex h-full flex-col p-7 sm:p-9">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <Heading className="mt-4 text-xl font-semibold">{service.name}</Heading>
            <p className="mt-3 flex-1 text-[15px] leading-7">{service.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Key technologies">
              {service.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
