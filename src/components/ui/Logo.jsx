import Link from "next/link";
import { profile } from "@/data/profile";

// Wordmark: monogram tile plus name. Pure markup so it follows the theme.
export default function Logo({ onClick }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3" aria-label={`${profile.fullName}, home`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-display text-sm font-bold text-canvas transition-colors group-hover:bg-accent group-hover:text-on-accent">
        {profile.initials}
      </span>
      <span className="hidden font-display text-[15px] font-semibold leading-tight text-ink sm:block">
        {profile.fullName}
        <span className="block font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-muted">
          {profile.role}
        </span>
      </span>
    </Link>
  );
}
