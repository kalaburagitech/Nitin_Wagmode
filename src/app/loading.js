// Shown while a route segment streams in.
export default function Loading() {
  return (
    <div role="status" className="shell flex min-h-[70vh] flex-col justify-center pt-[var(--header-h)]">
      <span className="sr-only">Loading…</span>
      <div className="w-full max-w-2xl space-y-5" aria-hidden="true">
        <div className="h-3 w-28 animate-pulse rounded-full bg-line/15" />
        <div className="h-12 w-3/4 animate-pulse rounded-xl bg-line/15" />
        <div className="h-4 w-full animate-pulse rounded-full bg-line/10" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-line/10" />
        <div className="relative h-0.5 w-40 overflow-hidden rounded-full bg-line/15">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-pulse bg-accent" />
        </div>
      </div>
    </div>
  );
}
