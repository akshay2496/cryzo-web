# CRYZO — Landing Page

Standalone marketing website for the CRYZO Restaurant POS System.
It is a separate project from the POS app (`../frontend`) and is built and deployed on its own.

**Stack:** React 18 + Vite 5 + Tailwind CSS 3 + lucide-react (same versions as `frontend`). No other runtime dependencies.

## Run locally

```bash
cd landing-page
npm install
cp .env.example .env      # adjust URLs if needed
npm run dev               # http://localhost:5174
```

## Build for production

```bash
npm run build             # client build → server-render pages → dist/ (static, pre-rendered HTML)
npm run preview           # http://localhost:4174
```

Deploy `dist/` to any static host (Nginx, Apache, Netlify, Vercel, S3, …). Each page is its own HTML file, so no rewrite rules are needed:

| URL | Source |
|---|---|
| `/` | `index.html` → `src/main.jsx` |
| `/privacy-policy/` | `privacy-policy/index.html` → `src/entries/privacy.jsx` |
| `/terms-and-conditions/` | `terms-and-conditions/index.html` → `src/entries/terms.jsx` |

## Configuration (`.env`)

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | **Production URL of this site** (e.g. `https://cryzo.in`). Adds canonical URLs, absolute Open Graph images, `sitemap.xml` and full structured data. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Optional Google Search Console verification code. |
| `VITE_POS_APP_URL` | POS web app URL. "Login" buttons go to `<url>/login`. |
| `VITE_API_URL` | **Required.** CRYZO backend API base (e.g. `https://api.your-domain/api`). Pricing comes only from `GET /subscriptions/plans/active` — the plans the super admin manages in the POS app (Subscription Plans). If the API can't be reached, the page shows a “couldn’t load plans” card with Try again / Ask for pricing. In production, add the landing domain to the backend `CORS_ORIGINS`. |
| `VITE_API_PROXY_TARGET` | Dev only: where `/api` is proxied (default `http://localhost:5000`). |
| `VITE_DEMO_API_URL` | Optional override. By default the demo form posts to `{VITE_API_URL}/public/demo-request`, and the backend emails the details to `DEMO_NOTIFY_EMAIL` (see below). If that fails, the form falls back to WhatsApp / email hand-off. |

## Page structure

Header (mega menus) → Hero (POS mockup + Android app mockups) → Capability strip → Feature rows (billing, KOT & kitchen, inventory, reports, online & WhatsApp orders) → All modules → Dashboard preview + 3 steps → Outlet types (tabs) → About / benefits → Integrations & add-ons → Pricing → FAQ → Demo booking → Footer.

## Demo requests by email

The demo form sends its details to the CRYZO backend, which emails them to you (nothing is stored in the database).

- Endpoint: `POST /api/public/demo-request` — `backend/routes/demoRequest.js` + `backend/controllers/demoRequestController.js` (5 requests per IP per hour, honeypot spam check).
- Email is sent with the backend's existing mailer (`backend/utils/mailer.js`: SMTP or SendGrid settings in the backend `.env`). Reply-To is set to the visitor's email, so you can reply directly.
- Recipient: `DEMO_NOTIFY_EMAIL` in the backend `.env` (comma-separated for several people). If not set, it goes to info@cryzo.shop.
- In production, add the landing page's domain to the backend `CORS_ORIGINS`, and set `VITE_API_URL` in this project to the backend's public `/api` URL.

## SEO

- **Pre-rendered HTML:** `npm run build` renders every page to static HTML (`src/entry-server.jsx` + `scripts/prerender.mjs`), then React hydrates it. Search engines and link previews see the full content without running JavaScript.
- **One source for meta tags:** titles, descriptions, canonical, Open Graph/Twitter tags and JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, WebPage, BreadcrumbList) come from `src/seo.js` and are injected by the `seoHead` plugin in `vite.config.js`. FAQ structured data is generated from `FAQS` in `src/content.js`, so it never goes out of sync.
- **Generated at build:** `robots.txt` always; `sitemap.xml` when `VITE_SITE_URL` is set.
- **Performance:** self-hosted Inter font (`@fontsource/inter`, no Google Fonts request), CSS inlined into each page, above-the-fold fonts preloaded, phone mockup content client-rendered to keep HTML light.
- **Also included:** favicon set + web manifest (`public/`), a `404.html` (noindex), one `<h1>` per page with the main keyword.
- After going live: add the site to Google Search Console and submit `https://YOUR-DOMAIN/sitemap.xml`.

## Where to edit

| What | File |
|---|---|
| All copy, modules, outlets, integrations, FAQs, contact | `src/content.js` |
| Pricing plans | **Backend** — POS app → Subscription Plans (name, duration label, price, description, active) |
| Brand colors | `tailwind.config.js` (`brand`, `ink`, `info`, `success`) + CSS variables in `src/landing.css` |
| Header & mega menu | `src/components/Header.jsx` |
| Hero | `src/components/Hero.jsx` |
| Feature rows, modules, dashboard, outlets, about, integrations | `src/components/Sections.jsx` |
| Pricing, FAQ, demo form | `src/components/Conversion.jsx` (plans loaded by `src/hooks/usePlans.js`) |
| Footer (incl. legal links) | `src/components/Footer.jsx` |
| Code-built UI mockups (sample data) | `src/components/Mockups.jsx` |
| API calls (plans, demo requests) | `src/services/api.js` |
| Page titles, descriptions, Open Graph, structured data | `src/seo.js` |
| Logo, favicons, share image | `public/brand/`, `public/icons/`, `public/favicon.ico`, `public/images/og-image.png` |
| Phone app mockups (sample data) | `src/components/PhoneMockups.jsx` |
| Privacy Policy / Terms text | `src/legal/privacyContent.jsx`, `src/legal/termsContent.jsx` |
| Company name, address, jurisdiction, Grievance Officer, “last updated” date | `src/legal/legalConfig.js` |
| Legal page layout (TOC, print) | `src/legal/LegalPage.jsx` |

## Before going live

- Set `VITE_SITE_URL` in `.env` to the production domain, then `npm run build`.
- Fill in `src/legal/legalConfig.js` (registered company name, address, court city, Grievance Officer name) and have a lawyer review the Privacy Policy and Terms — especially refunds, liability cap and data retention.
- Add social links to the footer when they exist.
- Replace the capability strip with real customer logos / testimonials only once you have permission to use them.
