// Server-only email helpers for the contact form. Reads SMTP settings from
// the environment; credentials never leave this module.
import nodemailer from "nodemailer";
import { profile, SITE_URL } from "@/data/profile";

export const CONFIRMATION_SUBJECT = `We received your message — ${profile.fullName}`;

function parseBoolean(value) {
  if (value === undefined || value === "") return undefined;
  return /^(true|1|yes)$/i.test(String(value).trim());
}

/**
 * SMTP settings from SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS.
 * Returns null when any required value is missing.
 */
export function getSmtpSettings(env = process.env) {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS; // never trimmed, logged, or returned to clients
  if (!host || !user || !pass) return null;

  const port = Number(env.SMTP_PORT) || 465;
  // Port 465 uses implicit TLS; other ports upgrade with STARTTLS.
  const secure = parseBoolean(env.SMTP_SECURE) ?? port === 465;

  return {
    transport: {
      host,
      port,
      secure,
      requireTLS: !secure, // refuse to send credentials over plain text
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    },
    from: env.CONTACT_FROM_EMAIL?.trim() || user,
    to: env.CONTACT_TO_EMAIL?.trim() || profile.email,
  };
}

export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Minimal, non-identifying error summary for logs.
export function describeSmtpError(error) {
  return {
    code: error?.code || "UNKNOWN",
    responseCode: error?.responseCode,
    command: error?.command,
    auth: error?.code === "EAUTH" || error?.responseCode === 535,
  };
}

const wrapper = (inner) => `<!doctype html><html><body style="margin:0;background:#f4f5f7">
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1f2937">${inner}</div>
</body></html>`;

export function buildEnquiryEmail(data, { from, to }) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Subject", data.subject],
    ["Phone", data.phone || "—"],
    ["Topic", data.service || "—"],
  ];

  return {
    from: { name: `${profile.fullName} Portfolio`, address: from },
    to,
    replyTo: { name: data.name, address: data.email },
    subject: `Portfolio enquiry: ${data.subject}`.slice(0, 200),
    text: [
      "New enquiry from your portfolio contact form.",
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      "",
      "Message:",
      data.message,
      "",
      "Reply to this email to answer the visitor directly.",
    ].join("\n"),
    html: wrapper(`
      <h2 style="margin:0 0 4px;font-size:20px">New portfolio enquiry</h2>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px">Reply to this email to answer ${escapeHtml(data.name)} directly.</p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>
      <div style="white-space:pre-wrap;background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:8px;font-size:15px;line-height:1.6">${escapeHtml(data.message)}</div>`),
  };
}

export function buildConfirmationEmail(data, { from }) {
  const paragraphs = [
    `Hi ${data.name},`,
    "Thank you for contacting me through my portfolio. I've received your message and appreciate your interest.",
    "I'll review your enquiry and get back to you as soon as possible.",
  ];
  const signature = ["Best regards,", profile.fullName, profile.role, SITE_URL];

  return {
    from: { name: profile.fullName, address: from },
    to: { name: data.name, address: data.email },
    replyTo: from,
    subject: CONFIRMATION_SUBJECT,
    text: [...paragraphs, signature.join("\n")].join("\n\n"),
    html: wrapper(`
      ${paragraphs.map((p) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6">${escapeHtml(p)}</p>`).join("")}
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6">Best regards,<br>
        <strong>${escapeHtml(profile.fullName)}</strong><br>${escapeHtml(profile.role)}<br>
        <a href="${escapeHtml(SITE_URL)}" style="color:#0f766e">${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}</a></p>`),
  };
}

/**
 * Sends the enquiry to the site owner, then — only if that was accepted by
 * the SMTP server — a confirmation to the visitor. Throws if the enquiry
 * fails; reports confirmation failure in the result instead of throwing.
 */
export async function sendContactEmails(data, settings) {
  const transporter = nodemailer.createTransport(settings.transport);
  try {
    await transporter.sendMail(buildEnquiryEmail(data, settings));

    try {
      await transporter.sendMail(buildConfirmationEmail(data, settings));
      return { confirmationSent: true };
    } catch (error) {
      console.error("Contact confirmation email failed:", describeSmtpError(error));
      return { confirmationSent: false };
    }
  } finally {
    transporter.close();
  }
}
