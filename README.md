# Axivy

Axivy's digital solutions and automation website, built with Next.js App Router, React, JavaScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you need.

- `NEXT_PUBLIC_SITE_URL` — public site origin used for canonical URLs, Open Graph, sitemap and robots. Defaults to `https://axivy.vercel.app`. Set it to the custom domain once DNS is connected.
- `AXIVY_LEADS_TO` — inbox that receives quote and audit requests.
- `AXIVY_EMAIL_FROM` — verified sender address for email delivery.
- `RESEND_API_KEY` — optional Resend API key.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_SECURE` — SMTP fallback settings.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional GA4 measurement ID (`G-XXXXXXXXXX`).
- `GOOGLE_SHEET_WEBHOOK_URL` — optional Google Apps Script web app URL for storing leads in a sheet.
- `NEXT_PUBLIC_SCHEDULING_LINK` — optional Calendly or Cal.com booking link shown after an audit request.

Keep real credentials in `.env.local` or the hosting provider's environment settings. Never commit them.

## Content and contact details

Services, solutions, case studies, insights and FAQs live in `data/content.js`. Phone, WhatsApp, location and social links live in `data/contact.js`.
