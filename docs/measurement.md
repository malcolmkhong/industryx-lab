# Measurement and Search Operations

This site uses privacy-conscious, optional measurement. The production source of truth is `https://industryx-lab.vercel.app`.

The GA4 implementation, consent contract, event inventory, and failure modes that operators see in the GA4 dashboard live in [`docs/ga4-compliance.md`](./ga4-compliance.md). This file is the operator runbook: Vercel setup, reporting cadence, search ownership, and the release-gate checklist.

## Vercel Web Analytics

The root analytics boundary renders `@vercel/analytics` on every page. No environment variable is required. Vercel handles page views, visitor trends, and referrers automatically.

After the project is deployed:

1. Open the `industryx-lab` project in the Vercel dashboard.
2. Open **Analytics** and select **Enable Web Analytics**.
3. Redeploy if Vercel requests it, then visit the production site.
4. Confirm page views appear in the Analytics dashboard after processing.

Vercel Web Analytics is the primary page-view source. GA4 is the project's event stream: clicks, completions, referrals, milestones, and consent-gated custom events. See [`docs/ga4-compliance.md`](./ga4-compliance.md) for the GA4 contract.

## Reporting cadence

Review monthly:

- Vercel Web Analytics page views, top pages, referrers, and visitor trends.
- Search Console and Bing impressions, clicks, indexed pages, crawl problems, and query coverage.
- GA4 counts for the allowlisted events, if GA4 is enabled. See [`docs/ga4-compliance.md`](./ga4-compliance.md) for the event inventory.
- AI referral distribution without attempting to identify individual visitors.
- Cookie-consent grant rate (`analytics_storage === 'granted` count vs. total sessions). Useful when evaluating whether the banner is suppressing analytics.
- Broken outbound citations and redirects to outdated official documentation.

Record content changes in `docs/content-freshness-log.md`. Update the inventory in `docs/content-inventory.md` every quarter.

## Release gates

- `npm run check` runs types, lint, tests, static generation, and JSON-LD validation.
- `npm run lighthouse` audits the generated Home and Beginner pages. Reports remain local in `.lighthouseci/reports`.
- Confirm `robots.txt`, `sitemap.xml`, `llms.txt`, canonical tags, verification tags, and JSON-LD in `out/` before deployment.
- Validate production URLs again after deployment because local checks cannot detect hosting, DNS, or CDN problems.
- Validate that `out/*.html` still passes `src/lib/analytics/rendered-events.test.ts` (auto-fails in `npm run check`). This guards against labels drifting outside the inventory.

## Search ownership and sitemap submission

1. Add the production site to Google Search Console and Bing Webmaster Tools.
2. Copy only the verification token into `GOOGLE_SITE_VERIFICATION` or `BING_SITE_VERIFICATION` in Vercel. Do not paste a full meta tag.
3. Deploy, confirm the verification meta tag appears in the generated page head, and complete ownership verification.
4. Submit `https://industryx-lab.vercel.app/sitemap.xml` in both services.
5. Inspect `/` and `/build-project/beginner` after material content changes. Coming Soon routes are intentionally `noindex` and absent from the sitemap.
