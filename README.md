# H & H Custom Cabinetry website

A static Astro website for H & H Custom Cabinetry, based in Mississauga and serving the Greater Toronto and Hamilton Area. It is designed to deploy directly from a Git repository to Cloudflare Pages.

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

## Agent discovery

The site publishes machine-readable business information and agent discovery resources:

- `/llms.txt` and `/llms-full.txt`
- Markdown representations of the five main pages when a request sends `Accept: text/markdown`
- `/.well-known/ai-catalog.json` for Agentic Resource Discovery (ARD)
- `/.well-known/agent-skills/index.json` and the cabinetry-inquiry skill
- `/.well-known/api-catalog`, `/openapi.json`, and the public read-only business information API
- RFC 8288 discovery links in both HTTP response headers and HTML metadata
- WebMCP tools for verified business information, quote requests, and appointment requests
- A stateless Streamable HTTP MCP endpoint at `/mcp` with one read-only `contact_us` tool
- Content Signals in `/robots.txt`

Markdown negotiation is implemented by `functions/_middleware.js` for Cloudflare Pages. The middleware returns HTML normally and serves the corresponding Markdown asset only when a client explicitly requests `text/markdown`.

### Cloudflare DNS follow-up

DNS-AID cannot be configured from the repository. In the Cloudflare dashboard, enable DNSSEC and add this experimental discovery record only if the zone accepts SVCB records:

```text
Type: SVCB
Name: _index._agents
Priority: 1
Target: hhcustomcabinetry.ca
Parameters: alpn="h2,h3" port=443
```

DNS-AID is still an Internet-Draft. Do not publish `_a2a` or `_mcp` records unless real A2A or MCP endpoints are deployed.

After deployment, validate the production site with:

```sh
curl -I https://hhcustomcabinetry.ca/
curl -i -H 'Accept: text/markdown' https://hhcustomcabinetry.ca/
curl https://hhcustomcabinetry.ca/robots.txt
curl https://hhcustomcabinetry.ca/.well-known/ai-catalog.json
curl https://hhcustomcabinetry.ca/.well-known/agent-skills/index.json
curl https://hhcustomcabinetry.ca/.well-known/api-catalog
curl https://hhcustomcabinetry.ca/api/v1/business.json
curl https://hhcustomcabinetry.ca/.well-known/mcp/server-card.json
```

The MCP endpoint is intentionally public and read-only. Its only tool returns verified contact channels and official quote, appointment-request, and showroom links; it does not submit forms or confirm appointments.

## Contact actions

The Google contact form and Google Calendar booking URL are configured in `src/data/site.ts` as `quoteUrl` and `bookingUrl`.

The business phone, email, address, navigation, and external links are also maintained in this file.

The `notes/` directory contains temporary source material and is intentionally ignored by Git. Selected logo and portfolio files have been copied into `src/assets/`, where Astro optimizes them at build time.
