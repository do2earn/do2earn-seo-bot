# Do2Earn SEO Bot

Automated source-code SEO checks for Do2Earn projects.

## Current scope

- On-page and technical SEO source checks.
- Projects currently configured: Steem Flags and Steem Games.
- Off-page SEO is intentionally disabled.
- No database, Cloudflare Worker, or paid SEO API is required.
- Every audit recalculates the checks from the repositories' public source files. The last report is cached only in the browser's LocalStorage.

## Run locally

Open `index.html` through a static web server. The browser fetches the checklist from this folder and reads public repository files through GitHub's public API.

## Publish at do2earn.dev/do2earn-seo/

The source of truth is this repository. The public site is served by `do2earn/do2earn.github.io`, so GitHub Pages cannot mount this repository at an arbitrary sub-path by itself. The included GitHub Actions workflow syncs these four public files into the `do2earn-seo/` directory of the website repository.

To enable automatic publishing, add a repository Actions secret in **Settings → Secrets and variables → Actions**:

- Name: `SITE_DEPLOY_TOKEN`
- Value: a fine-grained GitHub Personal Access Token for the `do2earn` account, restricted to the `do2earn/do2earn.github.io` repository, with **Contents: Read and write** permission.

The workflow safely skips deployment until this secret exists. After adding it, run the workflow once from **Actions → Publish SEO Bot → Run workflow**. Future pushes to `main` will publish automatically.

## Limitations

This is a source-code audit, not a crawler of the live rendered website. It does not measure Google indexing, Core Web Vitals, backlinks, or live page performance. A PASS means the relevant pattern was found in source; it is not a guarantee of search ranking.