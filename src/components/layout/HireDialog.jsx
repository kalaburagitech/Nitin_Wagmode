"use client";

import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { profile } from "@/data/profile";
import ContactForm from "@/components/contact/ContactForm";

// Quick-contact dialog opened from the header. Uses the native <dialog>
// element, which provides focus trapping, Escape to close, and inert
// background content without extra code.
export default function HireDialog({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (event.target === ref.current) onClose();
      }}
      aria-labelledby="hire-dialog-title"
      className="m-auto w-[min(36rem,calc(100vw-2rem))] rounded-2xl border hairline bg-raised p-0 text-body shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Quick message</p>
              <h2 id="hire-dialog-title" className="mt-2 text-2xl font-semibold">
                Work with {profile.firstName}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Or email{" "}
                <a href={`mailto:${profile.email}`} className="text-accent underline underline-offset-4">
                  {profile.email}
                </a>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border hairline text-muted hover:text-ink"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>
          <ContactForm compact />
        </div>
      )}
    </dialog>
  );
}
