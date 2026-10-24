"use client";

import { useId } from "react";
import { FiAlertCircle, FiCheckCircle, FiLoader, FiMail, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { profile } from "@/data/profile";
import { enquiryTopics } from "@/data/contact";
import { CONTACT_LIMITS } from "@/lib/contactValidation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import useContactForm from "./useContactForm";

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-mono text-[11px] font-normal text-muted">optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <FiAlertCircle aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ compact = false }) {
  const uid = useId();
  const { values, errors, status, error, confirmationSent, onChange, onBlur, onSubmit } = useContactForm();
  const id = (name) => `${uid}-${name}`;
  const fieldProps = (name) => ({
    id: id(name),
    name,
    value: values[name],
    onChange,
    onBlur,
    maxLength: CONTACT_LIMITS[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
    className: "field",
  });

  // Fallback when email delivery isn't configured or fails.
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    values.subject.trim() || "Portfolio enquiry"
  )}&body=${encodeURIComponent(values.message)}`;
  const whatsappUrl = buildWhatsAppUrl({ name: values.name, message: values.message });

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5" aria-busy={status === "loading"}>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field id={id("name")} label="Name" error={errors.name}>
          <input type="text" autoComplete="name" required placeholder="Your full name" {...fieldProps("name")} />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email}>
          <input type="email" autoComplete="email" required placeholder="you@company.com" {...fieldProps("email")} />
        </Field>
        <div className={compact ? "" : "sm:col-span-2"}>
          <Field id={id("subject")} label="Subject" error={errors.subject}>
            <input type="text" required placeholder="e.g. Frontend developer role at Acme" {...fieldProps("subject")} />
          </Field>
        </div>
        <Field id={id("phone")} label="Phone" optional error={errors.phone}>
          <input type="tel" autoComplete="tel" placeholder="+91 …" {...fieldProps("phone")} />
        </Field>
        <Field id={id("service")} label="Topic" optional error={errors.service}>
          <select {...fieldProps("service")}>
            <option value="">Choose a topic</option>
            {enquiryTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={id("message")} label="Message" error={errors.message}>
        <textarea
          rows={compact ? 4 : 6}
          required
          placeholder="A few lines about the role or project…"
          {...fieldProps("message")}
          className="field resize-y"
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange}
        />
      </div>

      <div role="status" aria-live="polite">
        {status === "succeeded" && (
          <p className="flex items-start gap-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-ink">
            <FiCheckCircle className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
            <span>
              Thanks — your message has been sent.{" "}
              {confirmationSent
                ? "A confirmation email is on its way to your inbox (check spam if you don't see it)."
                : "Your enquiry was submitted, but the confirmation email to you couldn't be delivered — please double-check the address you entered."}
            </span>
          </p>
        )}
      </div>
      <div role="alert">
        {status === "failed" && (
          <div className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-ink">
            <p className="flex items-start gap-2">
              <FiAlertCircle className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
              {error}
            </p>
            <a
              href={mailto}
              className="mt-2 inline-flex items-center gap-1.5 pl-6 font-medium text-accent underline underline-offset-4"
            >
              <FiMail aria-hidden="true" /> Send it from your email app instead
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <FiLoader className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <FiSend aria-hidden="true" />
            </>
          )}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost w-full sm:w-auto"
          aria-label="Chat on WhatsApp (opens WhatsApp in a new tab)"
        >
          <FaWhatsapp className="text-[#25D366]" aria-hidden="true" /> Chat on WhatsApp
        </a>
      </div>
      <p className="text-xs text-muted">
        WhatsApp opens with your name and message filled in — nothing is sent until you press Send there.
      </p>
    </form>
  );
}
