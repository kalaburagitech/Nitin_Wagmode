import { profile } from "@/data/profile";
import { validateContact } from "@/lib/contactValidation";
import { claimOnce, isRateLimited, releaseClaim } from "@/lib/rateLimit";
import { describeSmtpError, getSmtpSettings, sendContactEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_BODY_BYTES = 16 * 1024;
const SUBMISSION_ID_RE = /^[A-Za-z0-9-]{8,64}$/;

const json = (body, status = 200) => Response.json(body, { status });

const fallbackError = (message) => `${message} Please email ${profile.email} directly.`;

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ success: false, error: "Unsupported content type." }, 415);
  }
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) {
    return json({ success: false, error: "Message is too large." }, 413);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ success: false, error: "Message is too large." }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json({ success: false, error: "Invalid request body." }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ success: false, error: "Invalid request body." }, 400);
  }

  // Honeypot: real visitors never see or fill the `website` field.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ success: true, confirmationSent: false });
  }

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return json({ success: false, error: "Please correct the highlighted fields.", errors }, 400);
  }

  const clientKey =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";
  if (await isRateLimited(clientKey)) {
    return json({ success: false, error: "Too many messages. Please try again in a few minutes." }, 429);
  }

  const settings = getSmtpSettings();
  if (!settings) {
    return json(
      {
        success: false,
        code: "EMAIL_NOT_CONFIGURED",
        error: fallbackError("The contact form isn't connected to email yet."),
      },
      503
    );
  }

  // Each form fill carries a random id, so a retried or double-sent request
  // can't deliver the enquiry (or the visitor's confirmation) twice.
  const submissionId = SUBMISSION_ID_RE.test(body.submissionId ?? "") ? body.submissionId : null;
  if (submissionId && !(await claimOnce(submissionId))) {
    return json({ success: false, code: "DUPLICATE", error: "This message has already been submitted." }, 409);
  }

  try {
    const { confirmationSent } = await sendContactEmails(data, settings);
    return json({
      success: true,
      confirmationSent,
      message: confirmationSent
        ? "Message sent. A confirmation email is on its way to you."
        : "Message sent, but the confirmation email to you couldn't be delivered.",
    });
  } catch (error) {
    if (submissionId) await releaseClaim(submissionId);
    console.error("Contact enquiry email failed:", describeSmtpError(error));
    return json(
      {
        success: false,
        code: "EMAIL_SEND_FAILED",
        error: fallbackError("Your message couldn't be sent right now."),
      },
      502
    );
  }
}

export function GET() {
  return json({ error: "Method not allowed" }, 405);
}
