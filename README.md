# Do2Earn SEO Bot

Automated source-code SEO checks for Do2Earn projects.

## Current scope

- On-page and technical SEO source checks.
- Projects currently configured: [Steem Flags](https://steemflags.do2earn.dev) and [Steem Games](https://steemgames.do2earn.dev).
- On-page and technical checks are defined in `on-page-checklist.json`.
- Off-page checks are defined separately in `off-page-checklist.json`. The audit discovers candidate references through public web search and verifies selected source pages with the Jina Reader service. Search discovery is not an exhaustive backlink index.
- No database or paid SEO API is required.
- Every audit recalculates the checks from the projects' public source files. The latest report is cached only in the browser's LocalStorage.
- Audit outcomes are `PASS`, `FAIL`, `UNKNOWN`, or `N/A`. `UNKNOWN` is excluded from the verified score and remains visible in coverage; `N/A` is excluded from both the score and applicable-check denominator.
- Hreflang is marked `N/A` when no multilingual or regional variants are detected. Image-loading checks only pass/fail images whose hero or below-the-fold role is explicit in source; ambiguous image positions remain `UNKNOWN`.

## Production deployment

**Production URL:** https://do2earn.dev/do2earn-seo-bot/

This repository is the sole source of truth for the SEO Bot. GitHub Actions builds the static runtime bundle from this repository and deploys it directly to a Cloudflare Worker. The Worker serves the bot only under `/do2earn-seo-bot/*` on `do2earn.dev`.

The deployment does not check out, modify, or push to `do2earn/do2earn.github.io`. It does not require `SITE_DEPLOY_TOKEN`.

### One-time setup

In this repository, open **Settings → Secrets and variables → Actions → New repository secret** and add:

- **Name:** `CLOUDFLARE_API_TOKEN`
- **Value:** a Cloudflare API token authorized for this account and zone, with **Workers Scripts: Edit** and **Workers Routes: Edit** permissions for the `do2earn.dev` zone. The token must also be able to upload Worker assets.

The Cloudflare account ID is already configured in `wrangler.toml` and the workflow. After adding the secret, run **Actions → Deploy SEO Bot → Run workflow** once. Future pushes to `main` automatically build and deploy the latest version.

### Deployment contents

The workflow validates JavaScript and JSON, then packages:
- `index.html`, `style.css`, and `script.js`
- `on-page-checklist.json` and `off-page-checklist.json`
- `keywords/steemgames.json`
- `public-manifests/*.json`

The Worker rewrites the public URL prefix before serving these assets, so relative URLs continue to work at the production subpath. Only requests under `/do2earn-seo-bot/` are handled by this Worker.

## Run locally

Serve this directory with a static web server and open `index.html`. The browser loads both checklist files, reads public repository files through GitHub, discovers external references with Jina Search, and reads candidate pages with Jina Reader. Opening the file directly with a `file://` URL may prevent browser requests from working.

## Limitations

This is a source-code audit, not a crawler of the live rendered website. It does not provide a complete backlink index, referring-domain totals, historical link gains/losses, backlink quality scoring, Google indexing coverage, Core Web Vitals, or social engagement analytics. Backlink profile searches are discovery-only; each candidate must be verified, and search coverage is not exhaustive. Backlink quality and monitoring require Search Console, Bing Webmaster Tools, a specialist backlink provider, or human review. A PASS means the relevant pattern was found in source; it is not a guarantee of search ranking. Some checks are heuristic and may need manual verification.
