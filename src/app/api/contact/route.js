import nodemailer from "nodemailer";
import { profile } from "@/data/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 254, phone: 20, service: 100, message: 5000 };

// Best-effort, per-instance throttle. Serverless instances don't share
// memory, so this only slows down repeated submissions from one client.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentSubmissions = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(key) || []).filter(
    (time) => now - time < RATE_WINDOW_MS
  );
  timestamps.push(now);
  recentSubmissions.set(key, timestamps);
  return timestamps.length > RATE_MAX;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTransportConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_USER, EMAIL_PASS } =
    process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT) || 587;
    return {
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    };
  }

  // Gmail shortcut: EMAIL_USER + a Google App Password in EMAIL_PASS.
  if (EMAIL_USER && EMAIL_PASS) {
    return { service: "gmail", auth: { user: EMAIL_USER, pass: EMAIL_PASS } };
  }

  return null;
}

function validate(body) {
  const errors = {};
  const data = {};

  for (const field of Object.keys(LIMITS)) {
    const value = typeof body?.[field] === "string" ? body[field].trim() : "";
    data[field] = value;
    if (value.length > LIMITS[field]) {
      errors[field] = `Must be ${LIMITS[field]} characters or fewer`;
    }
  }

  if (data.name.length < 2) errors.name = "Please enter your name";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address";
  if (data.message.length < 10) {
    errors.message = "Please write a message of at least 10 characters";
  }

  return { data, errors };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot: real visitors never see or fill the `website` field.
  if (typeof body?.website === "string" && body.website.trim()) {
    return Response.json({ success: true });
  }

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) {
    return Response.json(
      { success: false, error: "Please correct the highlighted fields.", errors },
      { status: 400 }
    );
  }

  const transportConfig = getTransportConfig();
  if (!transportConfig) {
    return Response.json(
      {
        success: false,
        code: "EMAIL_NOT_CONFIGURED",
        error: `The contact form isn't connected to email yet. Please email ${profile.email} directly.`,
      },
      { status: 503 }
    );
  }

  const clientKey =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(clientKey)) {
    return Response.json(
      { success: false, error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  const sender = transportConfig.auth.user;
  const recipient = process.env.CONTACT_TO_EMAIL || profile.email;
  const fromAddress = process.env.CONTACT_FROM_EMAIL || sender;

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Topic", data.service || "—"],
  ];

  try {
    const transporter = nodemailer.createTransport(transportConfig);
    await transporter.sendMail({
      from: `"${profile.fullName} Portfolio" <${fromAddress}>`,
      to: recipient,
      replyTo: data.email,
      subject: `Portfolio enquiry from ${data.name}`.slice(0, 150),
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        "",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="margin:0 0 16px">New portfolio enquiry</h2>
          <table style="border-collapse:collapse;margin-bottom:16px">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`
              )
              .join("")}
          </table>
          <p style="white-space:pre-wrap;background:#f3f4f6;padding:16px;border-radius:8px">${escapeHtml(data.message)}</p>
        </div>`,
    });

    return Response.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form email failed:", error?.message);
    return Response.json(
      {
        success: false,
        error: `Your message couldn't be sent right now. Please email ${profile.email} directly.`,
      },
      { status: 502 }
    );
  }
}

export function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
