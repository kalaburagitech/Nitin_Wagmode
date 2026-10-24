# Nitin Wagmode — Portfolio

Personal portfolio of **Nitin Wagmode**, Frontend Developer (React.js · Next.js · React Native · TypeScript) based in Bengaluru, India.

Built with Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, and Redux Toolkit.

## Features

- **Pages:** Home, About, Projects (category filter), Experience (timeline), Skills (search + category filter), Services, Resume (web version + PDF download), Blog (search, categories, article pages with table of contents and related posts), Contact, plus a custom 404 page and a loading state.
- **Design system:** light and dark themes with five accent colors (teal, indigo, coral, amber, lime), saved per visitor and applied before first paint. Tokens live in `src/app/globals.css`; accents in `src/data/site.js`.
- **Contact form** on `/contact` and in the header's "Hire me" dialog: sends the enquiry to `CONTACT_TO_EMAIL` (visitor set as Reply-To), then an automatic confirmation email to the visitor. One validation module (`src/lib/contactValidation.js`) is shared by browser and server; email logic lives in `src/lib/email.js`. Includes a honeypot field, content-type and size checks, duplicate-submission protection, truthful partial-failure reporting, accessible status messages, and a `mailto:` fallback.
- **WhatsApp click-to-chat** (`https://wa.me/916362050656`) on the contact page, prefilled from the visitor's name and message. Nothing is sent automatically.
- **Rate limiting:** 5 messages per 10 minutes per IP, stored in Upstash Redis when configured (shared across serverless instances), otherwise in memory.
- **SEO:** per-page metadata, canonical URLs, Open Graph/Twitter cards with a generated social image, `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD (Person, WebSite, BreadcrumbList, Blog, BlogPosting). Pages are server-rendered.
- **Accessibility:** semantic landmarks and heading order, skip link, labelled fields with announced errors, `aria-current`/`aria-pressed` states, native `<dialog>` for the contact dialog, Escape to close menus, focus return, visible focus rings, and `prefers-reduced-motion` support (cursor ring, scroll reveals, route bar, and CSS animation are disabled or reduced).
- **Blog drafts:** posts with `draft: true` show in development and are hidden in production until published.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS 3 with CSS-variable design tokens; Space Grotesk, Inter, and JetBrains Mono via `next/font` |
| Animation | Framer Motion (`MotionConfig reducedMotion="user"`) |
| State | Redux Toolkit (contact form status) |
| Email | Nodemailer (Gmail App Password or any SMTP provider) |
| Rate limiting | Upstash Redis REST API (optional, no extra dependency) |
| Icons | react-icons |

## Project structure

```
content/blogs/            Blog articles (Markdown with frontmatter)
public/                   Nitin_Wagmode.pdf (résumé), icons, og-image.png, assets/ (photo, covers)
scripts/generate-assets.py  Regenerates project/blog covers, icons, and the OG image
src/
  app/                    Routes, metadata, sitemap.js, robots.js, manifest.js
    api/contact/          Contact endpoint (server-only)
  components/
    layout/               SiteHeader, MobileNav, HireDialog, SiteFooter, BackToTop
    home/                 Home page sections
    contact/              ContactForm + useContactForm hook
    projects/ skills/ experience/ blog/   Section components
    theme/                ThemeProvider, ThemeToggle, AccentPicker
    motion/               Reveal, RouteProgress, CursorRing
    ui/                   PageHeader, SectionHeading, FilterBar, SocialLinks, Logo, SkillIcon, JsonLd
  data/                   ← Edit these files to update site content
    profile.js            Name, contact details, links, summary, education, SITE_URL
    experience.js         Work history
    projects.js           Projects and categories
    skills.js             Skill groups
    services.js           Services
    achievements.js       Resume results (only figures stated on the resume)
    contact.js            Contact copy and enquiry topics
    navigation.js         Header navigation
    site.js               Default theme and accent palette
  lib/                    Blog loader, SEO helpers, theme bootstrap, validation, rate limiter
  redux/                  Store and contact slice
```

## Getting started

Requirements: **Node.js 18.17+** and **npm**.

```bash
npm ci                        # install exact dependencies from package-lock.json
cp .env.example .env.local    # optional — see Environment variables
npm run dev                   # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (draft posts visible) |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run generate:assets` | Regenerate covers, icons, and OG image (needs Python 3 + Pillow) |

## Environment variables

All are optional; the site builds and runs without them. See [`.env.example`](.env.example).

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical links, sitemap, robots, and Open Graph (no trailing slash). |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | SMTP server for the contact form. Gmail: `smtp.gmail.com`, `465`, `true`, your address, a Google App Password. |
| `CONTACT_TO_EMAIL` | Inbox for enquiries (defaults to the email in `src/data/profile.js`). |
| `CONTACT_FROM_EMAIL` | Sender for both emails (defaults to `SMTP_USER`). |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Shared rate limiting and duplicate-submission protection for the contact form. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID. Analytics is off when empty. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code. |
| `SHOW_DRAFT_POSTS` | `true` to include draft posts in a production build (build-time). |

Server-only variables (no `NEXT_PUBLIC_` prefix) are never sent to the browser. Never commit `.env.local`.

### Contact email (Gmail)

1. Turn on 2-Step Verification for the Google account, then create an **App password** (Google Account → Security → App passwords).
2. In Vercel → Settings → Environment Variables set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER=<gmail address>`, `SMTP_PASS=<app password>`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (the same Gmail address).
3. Redeploy, send a test message from `/contact`, and check both inboxes (and spam).

For local testing, put the same variables in `.env.local` (git-ignored), never in committed files.

The API reports only what it can verify: `200` with `confirmationSent: true|false` once the enquiry is accepted by the SMTP server, `502` if the enquiry fails (no confirmation is sent), `503` if SMTP isn't configured. SMTP acceptance doesn't guarantee inbox delivery.

### Tests

`npm run test:integration` builds the app and runs `tests/contact.integration.test.mjs`. It starts the production server against a local fake SMTP server (implicit TLS, like Gmail on 465) and checks validation, both emails, HTML escaping, partial failures, duplicate protection, auth failure, missing config, rate limiting, the WhatsApp link, the resume PDF, and that no SMTP settings reach client bundles. Requires `openssl` on PATH. No real email is sent. (`npm run test:contact` reruns the tests against an existing build.)

### Rate limiting (Upstash)

1. Create a Redis database at [upstash.com](https://upstash.com) (a free tier is available; check their current pricing page for limits).
2. Copy the **REST URL** and **REST token** into `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` in Vercel.
3. Redeploy. Each accepted submission uses two Redis commands.

If Upstash is unreachable the endpoint logs the error and falls back to the in-memory limiter rather than rejecting real enquiries.

## Updating content

- **Profile, links, summary:** `src/data/profile.js`. Add a URL to `socials.github` to show GitHub links.
- **Photo:** `public/assets/profile.webp` (transparent portrait, 640×800) and `public/assets/profile-square.jpg` (800×800, used for structured data and the OG image). Run `npm run generate:assets` after replacing the square photo to rebuild the OG image.
- **Resume:** replace `public/Nitin_Wagmode.pdf` (keep the name; `/resume.pdf` redirects to it).
- **Projects / experience / skills / services:** edit the matching file in `src/data/`. Add a URL to a project's `liveLink`/`githubLink` to show link buttons.
- **Blog:** add a `.mdx` file to `content/blogs/` (copy an existing post's frontmatter) and set `draft: false` to publish. The five existing articles are drafts awaiting review.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Vercel → **Add New → Project → Import** the repository. Next.js is auto-detected.
3. Add environment variables (at least `NEXT_PUBLIC_SITE_URL`, the email variables, and the Upstash variables) for Production.
4. Deploy. Pushes to `main` deploy to Production; other branches get Preview deployments.
5. Custom domain: **Settings → Domains**, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

### Post-deploy checklist

- [ ] All routes load without console errors.
- [ ] `/Nitin_Wagmode.pdf` downloads (and `/resume.pdf` redirects to it).
- [ ] The contact form and "Hire me" dialog deliver a test email.
- [ ] `/sitemap.xml` and `/robots.txt` show the production domain.
- [ ] A link preview shows the Open Graph image.
- [ ] Theme and accent choices persist across reloads.

## Known limitations

- No public GitHub profile or project live links were provided, so those buttons are hidden (KLB Connect links to the Kalaburagi Tech website).
- Project and blog images are generated illustrations, not product screenshots.
- The profile photo was cleaned up from a scanned passport photo; a professionally shot photo would look better.
- Blog articles are drafts pending review, so the production blog shows an "Articles are on the way" message.

## License

All personal content, articles, photos, and artwork © Nitin Wagmode. Third-party packages are used under their own licenses (see `node_modules/*/LICENSE`).
