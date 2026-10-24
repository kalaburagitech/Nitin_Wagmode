import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { profile } from "@/data/profile";
import Reveal from "@/components/motion/Reveal";

export default function ContactBand() {
  return (
    <section aria-labelledby="contact-band-title" className="shell mt-28">
      <Reveal className="relative overflow-hidden rounded-[2rem] border hairline bg-raised px-7 py-14 sm:px-14 sm:py-20">
        <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative max-w-2xl">
          <p className="eyebrow">Open to work</p>
          <h2 id="contact-band-title" className="mt-3 text-3xl font-semibold sm:text-5xl">
            Hiring a frontend developer?
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">{profile.workPreference}. Tell me about the role or project.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Start a conversation <FiArrowRight aria-hidden="true" />
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              <FiMail aria-hidden="true" /> {profile.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
