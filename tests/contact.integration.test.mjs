// Integration tests for the contact form API and contact page.
//
// Runs the production build (`next start`) against a local fake SMTP server
// that speaks implicit TLS, like Gmail on port 465. No real email is sent and
// no real credentials are used.
//
//   npm run test:integration      (builds first, then runs this file)
//
// Requires `openssl` on PATH to create a throwaway TLS certificate.

import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import tls from "node:tls";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OWNER = "owner@test.local";
const FROM = "sender@test.local";
const SMTP_USER = "sender@test.local";
const SMTP_PASS = "fake-test-password-123";
const SMTP_PORT = 24650;
const PORTS = { ok: 3301, badAuth: 3302, unconfigured: 3303 };

// ---------------------------------------------------------------------------
// Fake SMTP server (implicit TLS). Behaviour hooks:
//   - RCPT TO confirmfail@test.local  -> 550 (confirmation email rejected)
//   - message containing FAILPRIMARY  -> 554 on DATA (enquiry rejected)
//   - wrong password                  -> 535
// ---------------------------------------------------------------------------
const delivered = [];
let smtpServer;

function startSmtp(certDir) {
  const options = {
    key: readFileSync(path.join(certDir, "key.pem")),
    cert: readFileSync(path.join(certDir, "cert.pem")),
  };
  smtpServer = tls.createServer(options, (socket) => {
    let buffer = "";
    let inData = false;
    let envelope = { from: null, to: [] };
    let authed = false;
    const reply = (line) => socket.write(`${line}\r\n`);

    reply("220 fake.smtp ESMTP ready");
    socket.on("error", () => {});
    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      while (true) {
        if (inData) {
          const end = buffer.indexOf("\r\n.\r\n");
          if (end === -1) return;
          // Undo SMTP dot-stuffing (RFC 5321 4.5.2).
          const data = buffer.slice(0, end).replace(/^\./gm, "");
          buffer = buffer.slice(end + 5);
          inData = false;
          if (data.includes("FAILPRIMARY") && envelope.to.includes(OWNER)) {
            reply("554 5.7.1 Message rejected by test");
          } else {
            delivered.push({ ...envelope, data });
            reply("250 2.0.0 OK queued");
          }
          envelope = { from: null, to: [] };
          continue;
        }
        const nl = buffer.indexOf("\r\n");
        if (nl === -1) return;
        const line = buffer.slice(0, nl);
        buffer = buffer.slice(nl + 2);
        const upper = line.toUpperCase();

        if (upper.startsWith("EHLO") || upper.startsWith("HELO")) {
          socket.write("250-fake.smtp\r\n250-AUTH PLAIN\r\n250-8BITMIME\r\n250 SMTPUTF8\r\n");
        } else if (upper.startsWith("AUTH PLAIN")) {
          const decoded = Buffer.from(line.split(" ")[2] || "", "base64").toString("utf8");
          const [, user, pass] = decoded.split("\0");
          authed = user === SMTP_USER && pass === SMTP_PASS;
          reply(authed ? "235 2.7.0 Authentication successful" : "535 5.7.8 Authentication failed");
        } else if (upper.startsWith("MAIL FROM")) {
          if (!authed) reply("530 5.7.0 Authentication required");
          else {
            envelope.from = line.match(/<([^>]*)>/)?.[1];
            reply("250 OK");
          }
        } else if (upper.startsWith("RCPT TO")) {
          const to = line.match(/<([^>]*)>/)?.[1];
          if (to === "confirmfail@test.local") reply("550 5.1.1 Recipient rejected by test");
          else {
            envelope.to.push(to);
            reply("250 OK");
          }
        } else if (upper === "DATA") {
          inData = true;
          reply("354 End data with <CR><LF>.<CR><LF>");
        } else if (upper === "RSET") {
          envelope = { from: null, to: [] };
          reply("250 OK");
        } else if (upper === "NOOP") {
          reply("250 OK");
        } else if (upper === "QUIT") {
          reply("221 Bye");
          socket.end();
        } else {
          reply("502 Command not implemented");
        }
      }
    });
  });
  return new Promise((resolve) => smtpServer.listen(SMTP_PORT, "127.0.0.1", resolve));
}

// ---------------------------------------------------------------------------
// Next.js servers
// ---------------------------------------------------------------------------
const children = [];

function startNext(port, extraEnv) {
  const env = { ...process.env, PORT: String(port), NODE_ENV: "production", ...extraEnv };
  for (const key of ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"]) {
    if (!(key in extraEnv)) delete env[key];
  }
  const child = spawn(process.execPath, [path.join(ROOT, "node_modules/next/dist/bin/next"), "start", "-p", String(port)], {
    cwd: ROOT,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.logs = "";
  child.stdout.on("data", (d) => (child.logs += d));
  child.stderr.on("data", (d) => (child.logs += d));
  children.push(child);
  return child;
}

async function waitFor(port) {
  for (let i = 0; i < 120; i++) {
    try {
      await fetch(`http://127.0.0.1:${port}/robots.txt`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`next start on ${port} did not become ready`);
}

const smtpEnv = (pass) => ({
  SMTP_HOST: "127.0.0.1",
  SMTP_PORT: String(SMTP_PORT),
  SMTP_SECURE: "true",
  SMTP_USER,
  SMTP_PASS: pass,
  CONTACT_TO_EMAIL: OWNER,
  CONTACT_FROM_EMAIL: FROM,
  NODE_TLS_REJECT_UNAUTHORIZED: "0", // self-signed test certificate only
});

let ipCounter = 0;
async function post(port, body, { contentType = "application/json", ip, raw } = {}) {
  const response = await fetch(`http://127.0.0.1:${port}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": contentType, "X-Real-IP": ip || `10.0.0.${++ipCounter}` },
    body: raw ?? JSON.stringify(body),
  });
  let json = null;
  try {
    json = await response.json();
  } catch {}
  return { status: response.status, json };
}

const valid = (overrides = {}) => ({
  name: "Asha Rao",
  email: "asha@example.com",
  subject: "Frontend role",
  message: "Hello Nitin, I'd like to talk about a frontend role.",
  submissionId: `test-${Math.random().toString(36).slice(2, 12)}`,
  ...overrides,
});

// Returns the decoded body of the MIME part with the given content type.
function mimePart(raw, type) {
  const start = raw.search(new RegExp(`Content-Type: ${type}`, "i"));
  if (start === -1) return "";
  const rest = raw.slice(start);
  const bodyStart = rest.indexOf("\r\n\r\n") + 4;
  const end = rest.indexOf("\r\n--", bodyStart);
  const body = rest.slice(bodyStart, end === -1 ? undefined : end);
  return /Content-Transfer-Encoding: base64/i.test(rest.slice(0, bodyStart))
    ? Buffer.from(body.replace(/\s+/g, ""), "base64").toString("utf8")
    : decodeQP(body);
}

const decodeQP = (s) => s.replace(/=\r\n/g, "").replace(/=([0-9A-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));

// ---------------------------------------------------------------------------

before(async () => {
  assert.ok(existsSync(path.join(ROOT, ".next", "BUILD_ID")), "Run `npm run build` first");
  const certDir = mkdtempSync(path.join(tmpdir(), "nw-smtp-"));
  execFileSync("openssl", [
    "req", "-x509", "-newkey", "rsa:2048", "-nodes", "-days", "1", "-subj", "/CN=localhost",
    "-keyout", path.join(certDir, "key.pem"), "-out", path.join(certDir, "cert.pem"),
  ], { stdio: "ignore" });
  await startSmtp(certDir);
  startNext(PORTS.ok, smtpEnv(SMTP_PASS));
  startNext(PORTS.badAuth, smtpEnv("wrong-password"));
  startNext(PORTS.unconfigured, {});
  await Promise.all(Object.values(PORTS).map(waitFor));
});

after(() => {
  for (const child of children) child.kill();
  smtpServer?.close();
});

describe("request validation", () => {
  test("rejects unsupported content types with 415", async () => {
    const res = await post(PORTS.ok, null, { contentType: "text/plain", raw: "hello" });
    assert.equal(res.status, 415);
  });

  test("rejects malformed JSON with 400", async () => {
    const res = await post(PORTS.ok, null, { raw: "{not json" });
    assert.equal(res.status, 400);
  });

  test("rejects non-object bodies with 400", async () => {
    const res = await post(PORTS.ok, null, { raw: "[1,2]" });
    assert.equal(res.status, 400);
  });

  test("rejects oversized bodies with 413", async () => {
    const res = await post(PORTS.ok, valid({ message: "x".repeat(20000) }));
    assert.equal(res.status, 413);
  });

  test("returns field errors for empty and invalid input", async () => {
    const res = await post(PORTS.ok, { name: " ", email: "not-an-email", subject: "", message: "short" });
    assert.equal(res.status, 400);
    assert.deepEqual(Object.keys(res.json.errors).sort(), ["email", "message", "name", "subject"]);
  });

  test("enforces maximum lengths", async () => {
    const res = await post(PORTS.ok, valid({ subject: "s".repeat(151) }));
    assert.equal(res.status, 400);
    assert.match(res.json.errors.subject, /150/);
  });

  test("honeypot submissions are accepted silently and send nothing", async () => {
    const before = delivered.length;
    const res = await post(PORTS.ok, valid({ website: "http://spam.example" }));
    assert.equal(res.status, 200);
    assert.equal(delivered.length, before);
  });
});

describe("email delivery", () => {
  test("sends the enquiry to CONTACT_TO_EMAIL, then a confirmation to the visitor", async () => {
    const before = delivered.length;
    const res = await post(PORTS.ok, valid({
      name: "Asha O'Neil",
      subject: "Role <script>alert(1)</script>",
      message: "Hi <b>Nitin</b> & team,\nLine two.",
    }));
    assert.equal(res.status, 200);
    assert.equal(res.json.success, true);
    assert.equal(res.json.confirmationSent, true);

    const [enquiry, confirmation] = delivered.slice(before);
    assert.ok(enquiry && confirmation, "two messages delivered");

    assert.equal(enquiry.from, FROM);
    assert.deepEqual(enquiry.to, [OWNER]);
    const enquiryText = decodeQP(enquiry.data);
    assert.match(enquiryText, /Reply-To: .*asha@example\.com/i);
    assert.match(enquiryText, /Asha O'Neil/);
    const html = mimePart(enquiry.data, "text/html");
    assert.ok(html.length > 0, "has an HTML part");
    assert.ok(!html.includes("<script>") && !html.includes("<b>Nitin</b>"), "HTML part escapes untrusted input");
    assert.match(html, /&lt;script&gt;/);
    assert.match(mimePart(enquiry.data, "text/plain"), /Line two\./);

    assert.equal(confirmation.from, FROM);
    assert.deepEqual(confirmation.to, ["asha@example.com"]);
    const confirmationText = decodeQP(confirmation.data);
    assert.match(confirmationText, /Subject: =\?UTF-8\?|Subject: We received your message/);
    const confirmationPlain = mimePart(confirmation.data, "text/plain");
    assert.match(confirmationPlain, /^Hi Asha O'Neil,/);
    assert.match(confirmationPlain, /Thank you for contacting me through my portfolio/);
    assert.match(confirmationPlain, /Best regards,\r?\nNitin Wagmode\r?\nFrontend Developer\r?\nhttps:\/\/nitin-wagmode\.vercel\.app/);
  });

  test("reports a partial success when only the confirmation fails", async () => {
    const before = delivered.length;
    const res = await post(PORTS.ok, valid({ email: "confirmfail@test.local" }));
    assert.equal(res.status, 200);
    assert.equal(res.json.success, true);
    assert.equal(res.json.confirmationSent, false);
    const sent = delivered.slice(before);
    assert.equal(sent.length, 1);
    assert.deepEqual(sent[0].to, [OWNER]);
  });

  test("fails truthfully and sends no confirmation when the enquiry is rejected", async () => {
    const before = delivered.length;
    const res = await post(PORTS.ok, valid({ subject: "FAILPRIMARY please" }));
    assert.equal(res.status, 502);
    assert.equal(res.json.success, false);
    assert.equal(res.json.code, "EMAIL_SEND_FAILED");
    assert.equal(delivered.length, before);
  });

  test("a rejected enquiry can be retried with the same submission id", async () => {
    const submissionId = "retry-1234567890";
    const first = await post(PORTS.ok, valid({ subject: "FAILPRIMARY", submissionId }));
    assert.equal(first.status, 502);
    const second = await post(PORTS.ok, valid({ submissionId }));
    assert.equal(second.status, 200);
  });

  test("duplicate submissions deliver only once", async () => {
    const before = delivered.length;
    const body = valid({ submissionId: "dup-abcdef123456" });
    const results = await Promise.all([post(PORTS.ok, body), post(PORTS.ok, body)]);
    const statuses = results.map((r) => r.status).sort();
    assert.deepEqual(statuses, [200, 409]);
    assert.equal(delivered.length - before, 2, "one enquiry + one confirmation");
  });

  test("SMTP authentication failure returns a generic 502 without secrets", async () => {
    const res = await post(PORTS.badAuth, valid());
    assert.equal(res.status, 502);
    const text = JSON.stringify(res.json);
    assert.ok(!text.includes("wrong-password") && !/535|EAUTH|smtp/i.test(text));
  });

  test("missing SMTP configuration returns 503 EMAIL_NOT_CONFIGURED", async () => {
    const res = await post(PORTS.unconfigured, valid());
    assert.equal(res.status, 503);
    assert.equal(res.json.code, "EMAIL_NOT_CONFIGURED");
  });

  test("rate limits a single IP after 5 accepted requests", async () => {
    const ip = "10.9.9.9";
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(PORTS.ok, valid(), { ip })).status);
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
  });
});

describe("contact page", () => {
  test("renders the WhatsApp link with the right number and an encoded message", async () => {
    const html = await (await fetch(`http://127.0.0.1:${PORTS.ok}/contact`)).text();
    const hrefs = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
    assert.ok(hrefs.length >= 2, "WhatsApp link in the channel list and the form");
    for (const href of hrefs) {
      const url = new URL(href);
      assert.equal(url.pathname, "/916362050656");
      assert.match(url.searchParams.get("text"), /^Hi Nitin, I visited your portfolio/);
      assert.ok(!href.includes(" "), "message is URL-encoded");
    }
    assert.match(html, /target="_blank" rel="noopener noreferrer"[^>]*>|rel="noopener noreferrer"/);
  });

  test("resume PDF is served", async () => {
    const res = await fetch(`http://127.0.0.1:${PORTS.ok}/resume.pdf`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "application/pdf");
    const bytes = Buffer.from(await res.arrayBuffer());
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
  });
});

describe("secrets", () => {
  test("client bundles never reference SMTP settings", () => {
    const dir = path.join(ROOT, ".next", "static");
    const files = [];
    const walk = (d) => {
      for (const name of readdirSync(d)) {
        const p = path.join(d, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (p.endsWith(".js")) files.push(p);
      }
    };
    walk(dir);
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      assert.ok(!/SMTP_PASS|SMTP_USER|nodemailer/.test(text), `${path.basename(file)} leaks server config`);
    }
  });

  test("server logs don't contain the password or message bodies", () => {
    const logs = children.map((c) => c.logs).join("\n");
    assert.ok(!logs.includes(SMTP_PASS) && !logs.includes("wrong-password"));
    assert.ok(!logs.includes("I'd like to talk about a frontend role"));
  });
});
