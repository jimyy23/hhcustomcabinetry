# H & H Cabinet website

A static Astro website for H & H Cabinet in Mississauga, Ontario. It is designed to deploy directly from a Git repository to Cloudflare Pages.

## Local development

Requires Node.js 22.12 or newer. Node.js 24 LTS is recommended for Cloudflare Pages.

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. Cloudflare Pages should use:

- Build command: `npm run build`
- Output directory: `dist`

## Before launch

Replace the two placeholder URLs in `src/data/site.ts`:

- `quoteUrl`: the published Google Form URL used by **Get a free quote** and contact actions
- `bookingUrl`: the published Google Calendar appointment schedule URL

The business phone, email, address, navigation, and external links are also maintained in this file.

The `notes/` directory contains temporary source material and is intentionally ignored by Git. Selected logo and portfolio files have been copied into `src/assets/`, where Astro optimizes them at build time.
