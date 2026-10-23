# Nitin Wagmode — Portfolio

Personal portfolio of **Nitin Wagmode**, Frontend Developer (React.js · Next.js · React Native · TypeScript), based in Bengaluru, India.

Built with Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, and Redux Toolkit. The visual design and interactions are adapted from an open-source portfolio template ([MuskuNishitha/Portfolio](https://github.com/MuskuNishitha/Portfolio)); all personal content, artwork, and copy here are Nitin's own.

## Features

- **Pages:** Home, About (profile + filterable skills), Projects (category filter), Experience (timeline), Resume (experience, education, results, PDF download), Contact, Blog (search, categories, article pages with table of contents and related posts), Skills, and Services.
- **Dark / light theme** plus an accent-color picker, saved per visitor and applied before first paint.
- **Working contact form** (Contact page and the "Hire Me" dialog): client and server validation, duplicate-submit protection, honeypot spam field, per-instance rate limiting, and an email fallback whenever email delivery isn't configured or fails.
- **SEO:** per-page metadata, canonical URLs, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD (Person, WebSite, Breadcrumb, Blog, BlogPosting). Pages are server-rendered, so crawlers and link previews see full content.
- **Accessibility:** semantic landmarks, skip link, labelled form fields with announced errors, `aria-current`/`aria-pressed` states, Escape-to-close dialogs, visible focus rings, and `prefers-reduced-motion` support.
- **Blog drafts:** posts with `draft: true` are visible in development and hidden from production until reviewed.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS 3, CSS variables for theming |
| Animation | Framer Motion |
| State | Redux Toolkit, React Redux |
| Email | Nodemailer (Gmail App Password or any SMTP provider) |
| Icons | react-icons |

## Project structure

```
content/blogs/          Blog articles (Markdown with frontmatter)
public/                 Static files: resume.pdf, icons, og-image.png, assets/
scripts/
  generate-assets.py    Regenerates logo, placeholder portrait, covers, icons, OG image
src/
  app/                  Routes, metadata, sitemap.js, robots.js, manifest.js
    api/contact/        Contact form endpoint (server-only)
  components/           Shared components (theme, cursor, blog, icons, ...)
  data/                 ← Edit these files to update site content
    profile.js          Name, contact details, links, summary, education, SITE_URL
    experience.js       Work history
    projects.js         Projects and categories
    skills.js           Skill groups
    navigation.js       Header navigation
  global/               Header, footer, banners, social links
  lib/                  Content view-models, blog loader, SEO helpers
  mainPages/            Page-level section components
  redux/                Store and contact slice
```

## Getting started

Requirements: **Node.js 18.17+** (developed on Node 20) and **npm**.

```bash
npm ci                 # install exact dependencies from package-lock.json
cp .env.example .env.local   # optional — see Environment variables
npm run dev            # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload (draft posts visible) |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run generate:assets` | Regenerate artwork (needs Python 3 + Pillow) |

## Environment variables

All are optional — the site builds and runs without any of them. See [`.env.example`](.env.example).

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical links, sitemap, robots, and Open Graph (no trailing slash). |
| `EMAIL_USER`, `EMAIL_PASS` | Gmail sending: address + a Google **App Password**. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Any SMTP provider (takes precedence over Gmail when set). |
| `CONTACT_TO_EMAIL` | Inbox for enquiries (defaults to the email in `src/data/profile.js`). |
| `CONTACT_FROM_EMAIL` | Sender address, if your provider requires a verified sender. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID. Analytics is off when empty. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code. |
| `SHOW_DRAFT_POSTS` | `true` to include draft posts in a production build (build-time). |

Server-only variables (no `NEXT_PUBLIC_` prefix) are never sent to the browser.

### Contact form setup (Gmail)

1. Turn on 2-Step Verification for the Google account.
2. Google Account → Security → **App passwords** → create one for "Mail".
3. Set `EMAIL_USER=you@gmail.com` and `EMAIL_PASS=<the 16-character app password>` locally and in Vercel.
4. Redeploy, then send a test message from `/contact` and check the inbox (and spam folder).

Without these variables, the form replies honestly that email isn't configured and offers a pre-filled `mailto:` link. It never pretends to have sent a message.

## Updating content

- **Profile, links, summary:** `src/data/profile.js`. Add a GitHub URL to `socials.github` to show GitHub buttons across the site.
- **Profile photo:** add e.g. `public/assets/profile.jpg` and set `profileImageUrl: "/assets/profile.jpg"`.
- **Resume:** replace `public/resume.pdf`.
- **Projects / experience / skills:** edit the matching file in `src/data/`. Add a screenshot path to a project's `image` field, or a URL to `liveLink`/`githubLink` to show link buttons.
- **Blog:** add a `.mdx` file to `content/blogs/` (copy an existing post's frontmatter). Set `draft: false` to publish.

### Draft blog posts — review needed

The five articles in `content/blogs/` were drafted for this portfolio and are marked `draft: true`. Review, edit, and set `draft: false` on each one you want to publish; until then the production blog shows an "Articles are on the way" message.

## Deployment (Vercel)

1. Push this repository to your own GitHub account or organization.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Next.js** (auto-detected). Build command `npm run build`, install command `npm ci`, output: default.
4. Add environment variables (at least `NEXT_PUBLIC_SITE_URL` and the email variables) under **Settings → Environment Variables** for Production (and Preview if wanted).
5. Deploy. Every branch push creates a **Preview** deployment; pushes or merges to `main` deploy to **Production**.
6. Custom domain: **Settings → Domains → Add**, follow the DNS instructions, then set `NEXT_PUBLIC_SITE_URL` to the domain and redeploy.

### Post-deploy checklist

- [ ] Home, About, Projects, Experience, Resume, Contact, Blog, Skills, and Services load without console errors.
- [ ] `/resume.pdf` downloads.
- [ ] Contact form and Hire Me dialog deliver a test email.
- [ ] `/sitemap.xml` and `/robots.txt` show the production domain.
- [ ] A link preview (e.g. pasting the URL in LinkedIn's post composer) shows the Open Graph image.
- [ ] Theme toggle and color picker persist across reloads.

## Troubleshooting

- **`EADDRINUSE: :3000`** — another server is running; stop it or use `npm run dev -- -p 3001`.
- **Contact form returns "isn't connected to email yet"** — email env vars are missing in that environment; add them and redeploy.
- **Gmail `Invalid login` / `535`** — use an App Password, not the account password.
- **Changed `NEXT_PUBLIC_*` or `SHOW_DRAFT_POSTS` but nothing changed** — these are read at build time; redeploy.
- **Browserslist "caniuse-lite is outdated" warning** — harmless; run `npx update-browserslist-db@latest` to refresh.

## Known limitations

- No professional photo yet — a neutral placeholder is shown until one is added.
- No public GitHub profile URL or project live links were provided, so those buttons are hidden (KLB Connect links to the Kalaburagi Tech website).
- Project images are original illustrations, not product screenshots.
- Rate limiting is per serverless instance (best-effort); use a provider like Upstash for strict limits.
- The blog articles are drafts pending review.

## Credits

Design and interaction patterns adapted from [MuskuNishitha/Portfolio](https://github.com/MuskuNishitha/Portfolio). All personal content, articles, and generated artwork belong to Nitin Wagmode.
