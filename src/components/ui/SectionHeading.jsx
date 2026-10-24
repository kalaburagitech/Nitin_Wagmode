import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// Numbered section heading: "01 / Selected work" eyebrow, title, optional
// intro and a trailing link.
export default function SectionHeading({ index, eyebrow, title, intro, link, as: Tag = "h2", id }) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">
          {index && <span className="text-accent">{index} / </span>}
          {eyebrow}
        </p>
        <Tag id={id} className="mt-3 text-3xl font-semibold sm:text-4xl">
          {title}
        </Tag>
        {intro && <p className="mt-4 text-base leading-7 text-muted">{intro}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink hover:text-accent"
        >
          {link.label}
          <FiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
