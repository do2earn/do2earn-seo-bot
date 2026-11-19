# Do2Earn SEO Bot

Automated source-code SEO checks for Do2Earn projects.

## Current scope

- On-page and technical SEO source checks.
- Projects currently configured: [Steem Flags](https://steemflags.do2earn.dev) and [Steem Games](https://steemgames.do2earn.dev).
- On-page and technical checks are defined in `on-page-checklist.json`.
- Off-page checks are defined separately in `off-page-checklist.json`. The audit discovers candidate references through public web search and verifies selected source pages with the Jina Reader service. Search discovery is not an exhaustive backlink index.
- No database, Cloudflare Worker, or paid SEO API is required.
- Every audit recalculates the checks from the repositories' public source files. The latest report is cached only in the browser's LocalStorage.
- Audit outcomes are `PASS`, `FAIL`, `UNKNOWN`, or `N/A`. `UNKNOWN` is excluded from the verified score and remains visible in coverage; `N/A` is excluded from both the score and applicable-check denominator.
- Hreflang is marked `N/A` when no multilingual or regional variants are detected. Image-loading checks only pass/fail images whose hero or below-the-fold role is explicit in source; ambiguous image positions remain `UNKNOWN`.

## Open the published bot

**Production URL:** https://do2earn.dev/do2earn-seo-bot/

This repository is the source of truth and publishes itself directly with GitHub Actions and GitHub Pages. It does not copy files to, commit to, or require a token for `do2earn/do2earn.github.io`.

The project Pages site inherits the account's existing custom domain. Because the account-level Pages site uses `do2earn.dev`, this project is served at `https://do2earn.dev/do2earn-seo-bot/`. GitHub documents that project sites inherit the custom domain configured for the user or organization site unless a project-specific domain overrides it.

### One-time GitHub Pages setup

In this repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. This one-time repository setting is required before the first deployment. Then open **Actions → Publish SEO Bot** and run the workflow once if the initial push did not deploy successfully.

After Pages is enabled, every push to `main` automatically validates the SEO source and deploys the standalone site. No `SITE_DEPLOY_TOKEN`, cross-repository write permission, database, Cloudflare Worker, or paid hosting service is needed.

## Run locally

Serve this directory with a static web server and open `index.html`. The browser loads both checklist files, reads public repository files through GitHub, discovers external references with Jina Search, and reads candidate pages with Jina Reader. Opening the file directly with a `file://` URL may prevent browser requests from working.

## Limitations

This is a source-code audit, not a crawler of the live rendered website. It does not provide a complete backlink index, referring-domain totals, historical link gains/losses, backlink quality scoring, Google indexing coverage, Core Web Vitals, or social engagement analytics. Backlink profile searches are discovery-only; each candidate must be verified, and search coverage is not exhaustive. Backlink quality and monitoring require Search Console, Bing Webmaster Tools, a specialist backlink provider, or human review. A PASS means the relevant pattern was found in source; it is not a guarantee of search ranking. Some checks are heuristic and may need manual verification.
