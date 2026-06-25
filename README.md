# Kalite Çikolata — Foodist Istanbul 2026 Microsite

A premium, multilingual (EN / TR / AR) B2B microsite for **Kalite Çikolata**'s
participation in **Foodist Istanbul 2026**. It introduces the event, fixes the
booth details, opens catalogues fast, and converts visitors into leads stored in
**Google Sheets** — no paid database, no admin panel.

> **Event:** Foodist Istanbul 2026 · September 1–4, 2026
> **Venue:** Tüyap Fair and Congress Center — Istanbul, Türkiye
> **Booth:** Hall: 1 / Stand: 151B

---

## Tech stack

| Area      | Choice                                             |
| --------- | -------------------------------------------------- |
| Framework | Next.js 14 (App Router)                            |
| Language  | TypeScript + React                                 |
| Styling   | Tailwind CSS (design tokens for the brand palette) |
| i18n      | next-intl (EN / TR / AR, RTL for Arabic)           |
| Forms     | React Hook Form + Zod                              |
| Motion    | Framer Motion (subtle, reduced-motion aware)       |
| Storage   | Google Sheets via Google Apps Script webhook       |
| Hosting   | Vercel                                             |

No Supabase, no paid DB, no login, no admin panel.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000  → redirects to /en
```

Build & run production locally:

```bash
npm run build
npm run start
```

Routes: `/en`, `/tr`, `/ar`, and `/{locale}/thank-you`. The root `/` redirects
to the default locale.

---

## Environment variables

Copy `.env.example` → `.env.local`. See that file for the full list.

| Variable                              | Scope  | Purpose                                            |
| ------------------------------------- | ------ | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                | public | Canonical / OpenGraph base URL                     |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`         | public | WhatsApp number (international, no `+`)             |
| `NEXT_PUBLIC_DEFAULT_LOCALE`          | public | Fallback locale                                    |
| `GOOGLE_SCRIPT_WEBHOOK_URL`           | server | Apps Script Web App URL that writes to the Sheet   |
| `NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL`| public | Backup Google Form link shown if the webhook fails |
| `NEXT_PUBLIC_CATALOGUE_*_URL`         | public | Catalogue PDF links (stable for printed QR codes)  |

`GOOGLE_SCRIPT_WEBHOOK_URL` is **server-only** — it is read in `/api/lead` and
never shipped to the browser.

---

## Google Sheets lead capture

Leads are submitted from the in-site form → `POST /api/lead` → forwarded
server-side to a Google Apps Script Web App → appended as a row in your Sheet.

**Setup:**

1. Create a Google Sheet (e.g. "Kalite Foodist 2026 Leads").
2. `Extensions → Apps Script`, paste [`google-apps-script/Code.gs`](google-apps-script/Code.gs), save.
3. Run `setup()` once to create the header row (grant permissions).
4. `Deploy → New deployment → Web app`:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Copy the Web App URL into `GOOGLE_SCRIPT_WEBHOOK_URL` (local `.env.local`
   **and** Vercel project env vars).
6. Restrict edit access on the Sheet to the sales team only.

**Sheet columns:**

```
created_at | source | locale | full_name | company | country | phone | email |
interest_type | interested_brand | preferred_meeting_date | message | status |
owner | notes
```

`status` workflow suggestion: `New → Contacted → Meeting Booked → Catalogue Sent
→ Quotation Needed → Closed`.

**Fallback:** if the webhook is unavailable, set
`NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL` to a public Google Form and a backup link
appears under the submit button. The form still shows success and the WhatsApp
path always works.

---

## Catalogues & QR strategy

- Place the real PDFs in `public/catalogues/` (placeholders are committed) **or**
  point the `NEXT_PUBLIC_CATALOGUE_*_URL` vars to stable Google Drive links for
  very large files.
- **Do not change catalogue URLs after printing QR codes.** Lock the final URL
  first.
- **QR codes:**
  - Main QR → site root (`/`, auto-redirects to locale) or `/en`.
  - Catalogue QR → `/en#catalogues`.
  - Meeting QR → `/en#contact`.
- **UTM tracking:** append `?source=booth_qr`, `?source=linkedin`,
  `?source=whatsapp`, etc. The value is captured into the lead's `source` column.
- Test every QR on iPhone **and** Android, on mobile data (not just Wi-Fi),
  before printing.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel (framework auto-detected as Next.js).
3. Add all environment variables (from `.env.example`) in
   `Project → Settings → Environment Variables`.
4. Deploy. Verify the Preview URL, then promote to Production and attach the
   domain / subdomain.

---

## Assets to replace before launch

- `public/catalogues/*.pdf` — real catalogue PDFs (placeholders committed).
- `public/assets/og/og-default.png` — final branded social share image
  (1200×630; a placeholder is committed).
- `public/assets/logos/`, `public/assets/products/` — official logos and product
  photography.
- `src/content/team.ts` — only approved staff; publish phone numbers only after
  management approval.

---

## QA checklist (close before launch)

- [ ] EN / TR / AR all load from clean URLs.
- [ ] Arabic RTL is correct: text direction, buttons, spacing.
- [ ] `Hall: 1 / Stand: 151B` appears correctly everywhere.
- [ ] Every WhatsApp button opens a locale-appropriate prefilled message.
- [ ] Every catalogue link works on mobile and desktop.
- [ ] Form submits to Google Sheets successfully (check a test row).
- [ ] Thank-you page / success state shows after submit.
- [ ] Fast on mobile; no oversized images blocking the Hero.
- [ ] Looks premium B2B — not a generic template.
- [ ] Final QR codes tested before printing.

---

## Project structure

```
src/
  app/
    layout.tsx              # passthrough root layout
    not-found.tsx           # global 404
    robots.ts / sitemap.ts
    [locale]/
      layout.tsx            # <html>, fonts, metadata, providers, chrome
      page.tsx              # the single long landing page
      not-found.tsx
      thank-you/page.tsx
    api/lead/route.ts       # forwards leads to the Apps Script webhook
  components/
    layout/                 # Header, Footer, StickyMobileCTA
    sections/               # Hero, EventInfo, WhyVisit, ProductFamilies,
                            # Catalogue, Team, LeadForm, FAQ
    ui/                     # Button, Card, SectionTitle, LanguageSwitcher,
                            # Reveal, icons
  content/                  # site.ts, catalogues.ts, team.ts
  i18n/                     # routing.ts, request.ts
  lib/                      # submitLead.ts, validators.ts, analytics.ts
messages/                   # en.json, tr.json, ar.json
google-apps-script/Code.gs  # Sheets webhook
public/                     # catalogues, og, logos, products
```
