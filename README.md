# Do2Earn SEO Bot

Automated source-code SEO checks for Do2Earn projects.

## Current scope

- On-page and technical SEO source checks.
- Projects currently configured: [Steem Flags](https://steemflags.do2earn.dev) and [Steem Games](https://steemgames.do2earn.dev).
- Off-page SEO is intentionally disabled.
- No database, Cloudflare Worker, or paid SEO API is required.
- Every audit recalculates the checks from the repositories' public source files. The latest report is cached only in the browser's LocalStorage.

## Open the published bot

**Production URL:** https://do2earn.dev/do2earn-seo-bot/

The source of truth is this repository. The public website is served by `do2earn/do2earn.github.io`; GitHub Pages cannot mount this repository at an arbitrary sub-path by itself. The included GitHub Actions workflow syncs the four runtime files (`index.html`, `style.css`, `script.js`, and `seo-checklist.json`) into the `do2earn-seo-bot/` directory of the website repository.

## Enable automatic publishing

In this repository, open **Settings → Secrets and variables → Actions** and add:

- **Name:** `SITE_DEPLOY_TOKEN`
- **Value:** a fine-grained GitHub Personal Access Token for the `do2earn` account, restricted to the `do2earn/do2earn.github.io` repository, with **Contents: Read and write** permission.

The workflow safely skips deployment until this secret exists. After adding it, run **Actions → Publish SEO Bot → Run workflow** once. Future pushes to `main` will publish automatically.

The workflow creates/updates only `do2earn-seo-bot/` in the website repository. It does not change the website's `CNAME` or other site files.

## Run locally

Serve this directory with a static web server and open `index.html`. The browser loads `seo-checklist.json` from this directory and reads public repository files through GitHub's public API. Opening the file directly with a `file://` URL may prevent browser requests from working.

## Limitations

This is a source-code audit, not a crawler of the live rendered website. It does not measure Google indexing, Core Web Vitals, backlinks, or live page performance. A PASS means the relevant pattern was found in source; it is not a guarantee of search ranking. Some checks are heuristic and may need manual verification.
