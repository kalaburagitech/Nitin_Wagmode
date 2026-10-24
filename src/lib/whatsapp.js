import { profile } from "@/data/profile";

const MAX_MESSAGE_CHARS = 600;

// Click-to-chat link (https://wa.me/<number>?text=...). The visitor still
// reviews and sends the message themselves in WhatsApp. Never includes the
// visitor's email address.
export function buildWhatsAppUrl({ name = "", message = "" } = {}) {
  const cleanName = name.replace(/\s+/g, " ").trim().slice(0, 100);
  let topic = message.replace(/\s+/g, " ").trim();
  if (topic.length > MAX_MESSAGE_CHARS) topic = `${topic.slice(0, MAX_MESSAGE_CHARS - 1)}…`;

  const text =
    cleanName && topic
      ? `Hi Nitin, my name is ${cleanName}. I visited your portfolio and would like to discuss: ${topic}`
      : cleanName
        ? `Hi Nitin, my name is ${cleanName}. I visited your portfolio and would like to get in touch.`
        : "Hi Nitin, I visited your portfolio and would like to get in touch.";

  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;
}
