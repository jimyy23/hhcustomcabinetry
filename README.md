# H & H Cabinet website

A static Astro website for H & H Cabinet in Mississauga, Ontario. It is designed to deploy directly from a Git repository to Cloudflare Pages.

## Preview locally

Requires Node.js 22.12 or newer. The included `.nvmrc` selects Node.js 24 LTS.

```sh
nvm install
nvm use
npm ci
npm run dev
```

Astro will print a preview address on port `4321`. Keep that terminal running while reviewing the site.

### When working directly on your computer

Open [http://localhost:4321](http://localhost:4321) after running `npm run dev`.

### When working inside this VM or a remote VS Code workspace

The server runs inside the guest environment, so your computer's `localhost` may not be the same machine. In VS Code:

1. Open the **Ports** view from the bottom panel.
2. Choose **Forward a Port** and enter `4321` if it was not detected automatically.
3. Open the forwarded address shown by VS Code.

The repository's VS Code settings label port `4321` and request automatic browser opening. The VM address printed by Astro (for example, `10.0.2.15:4321`) may be unreachable from the host when VirtualBox uses NAT; use the forwarded address in that case.

Stop the background Astro server with:

```sh
npx astro dev stop
```

## Production build

Create and inspect a production build with:

```sh
npm run build
npm run preview
```

Cloudflare Pages should use:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: `24`

## Before launch

Replace the two placeholder URLs in `src/data/site.ts`:

- `quoteUrl`: the published Google Form URL used by **Get a free quote** and contact actions
- `bookingUrl`: the published Google Calendar appointment schedule URL

The business phone, email, address, navigation, and external links are also maintained in this file.

The `notes/` directory contains temporary source material and is intentionally ignored by Git. Selected logo and portfolio files have been copied into `src/assets/`, where Astro optimizes them at build time.
