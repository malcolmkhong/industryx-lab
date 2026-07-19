# Measurement and Search Operations

This site uses privacy-conscious, optional measurement. The production source of truth is `https://industryx-lab.vercel.app`.

## GA4 configuration

Set `NEXT_PUBLIC_GA_ID` in Vercel only when GA4 measurement is required. When it is blank or absent, the Google Analytics component and event tracker render nothing. Never place names, email addresses, account identifiers, prompts, form contents, query strings, fragments, or other sensitive values in an analytics event.

The event contract in `src/lib/analytics/events.ts` allows only:

| Event | Purpose | Allowed parameters |
| --- | --- | --- |
| `cta_click` | Measure navigation to a completed learning action. | Sanitized destination path. |
| `invitation_click` | Measure use of the disclosed Kimi invitation action. | Sanitized destination origin and path. |
| `outbound_link` | Measure visits to external documentation and resources. | Sanitized destination origin and path. |
| `ai_referral` | Measure visits referred by a recognized AI assistant. | Normalized source name only. |

AI referral detection recognizes ChatGPT, Perplexity, Claude, Gemini, Copilot, and Kimi domains. Unknown referrers are ignored rather than recorded as free-form text.

## Search ownership and sitemap submission

1. Add the production site to Google Search Console and Bing Webmaster Tools.
2. Copy only the verification token into `GOOGLE_SITE_VERIFICATION` or `BING_SITE_VERIFICATION` in Vercel. Do not paste a full meta tag.
3. Deploy, confirm the verification meta tag appears in the generated page head, and complete ownership verification.
4. Submit `https://industryx-lab.vercel.app/sitemap.xml` in both services.
5. Inspect `/` and `/build-project/beginner` after material content changes. Coming Soon routes are intentionally `noindex` and absent from the sitemap.

## Reporting cadence

Review monthly:

- Search Console and Bing impressions, clicks, indexed pages, crawl problems, and query coverage.
- GA4 counts for the four essential events, if GA4 is enabled.
- AI referral distribution without attempting to identify individual visitors.
- Broken outbound citations and redirects to outdated official documentation.

Record content changes in `docs/content-freshness-log.md`. Update the inventory in `docs/content-inventory.md` every quarter.

## Release gates

- `npm run check` runs types, lint, tests, static generation, and JSON-LD validation.
- `npm run lighthouse` audits the generated Home and Beginner pages. Reports remain local in `.lighthouseci/reports`.
- Confirm `robots.txt`, `sitemap.xml`, `llms.txt`, canonical tags, verification tags, and JSON-LD in `out/` before deployment.
- Validate production URLs again after deployment because local checks cannot detect hosting, DNS, or CDN problems.
