// Contact-form rules shared by the browser form and the API route, so both
// sides always agree on what a valid enquiry is.

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  phone: 20,
  service: 100,
  message: 5000,
};
export const CONTACT_FIELDS = Object.keys(CONTACT_LIMITS);

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const NAME_RE = /^[\p{L}\p{M}\s\-'.]+$/u;

// Single-line fields end up in email headers, so line breaks are never allowed.
const SINGLE_LINE = new Set(["name", "email", "subject", "phone", "service"]);

export function normalizeContactValue(field, raw) {
  if (typeof raw !== "string") return "";
  const value = SINGLE_LINE.has(field)
    ? raw.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ")
    : raw.replace(/\r\n?/g, "\n").replace(/[ \t]+\n/g, "\n");
  return value.trim();
}

export function validateContactField(field, rawValue) {
  const value = normalizeContactValue(field, rawValue);
  const limit = CONTACT_LIMITS[field];

  if (limit && value.length > limit) return `Must be ${limit} characters or fewer`;

  switch (field) {
    case "name":
      if (value.length < 2) return "Please enter your name";
      if (!NAME_RE.test(value)) return "Use letters, spaces, hyphens, or apostrophes";
      return "";
    case "email":
      return EMAIL_RE.test(value) ? "" : "Please enter a valid email address";
    case "subject":
      return value.length >= 3 ? "" : "Please add a short subject";
    case "phone": {
      if (!value) return "";
      const digits = value.replace(/\D/g, "").length;
      if (!/^[+\d\s()-]+$/.test(value) || digits < 10 || digits > 15) {
        return "Enter a phone number with 10–15 digits";
      }
      return "";
    }
    case "message":
      return value.length >= 10 ? "" : "Please write at least 10 characters";
    default:
      return "";
  }
}

// Normalizes untrusted input into trimmed strings and collects field errors.
export function validateContact(input) {
  const data = {};
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    data[field] = normalizeContactValue(field, input?.[field]);
    const error = validateContactField(field, data[field]);
    if (error) errors[field] = error;
  }
  return { data, errors };
}
