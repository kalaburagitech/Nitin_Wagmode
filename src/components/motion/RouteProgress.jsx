"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Thin accent bar that sweeps across the top when the route changes.
// Decorative only: hidden from assistive tech, and the global reduced-motion
// rule collapses the animation.
export default function RouteProgress() {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setRunId((id) => id + 1);
  }, [pathname]);

  if (!runId) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5">
      <div key={runId} className="route-progress h-full bg-accent" />
    </div>
  );
}
