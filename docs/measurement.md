# Measurement and Search Operations

This site uses privacy-conscious, optional measurement. The production source of truth is `https://industryx-lab.vercel.app`.

## Measurement plan

This document is the single source of truth for what events the site emits to GA4, what consent governs them, what labels are reserved, and how to debug the four common failure modes. Update this file in the same PR that changes the event surface, the label inventory, or the consent behavior.

## Vercel Web Analytics

The root analytics boundary renders `@vercel/analytics` on every page. No environment variable is required. Vercel handles page views, visitor trends, and referrers automatically.

After the project is deployed:

1. Open the `industryx-lab` project in the Vercel dashboard.
2. Open **Analytics** and select **Enable Web Analytics**.
3. Redeploy if Vercel requests it, then visit the production site.
4. Confirm page views appear in the Analytics dashboard after processing.

Vercel Web Analytics is the primary page-view source. GA4 below is the project's event stream: clicks, completions, referrals, milestones, and consent-gated custom events.

## GA4 configuration

Set `NEXT_PUBLIC_GA_ID` in Vercel only when GA4 measurement is required. When it is blank or absent, the Google Analytics component and event tracker render nothing and the cookie-consent banner skips the prompt (analytics stays denied).

### Measurement ID format

The measurement ID must match the GA4 format `G-` followed by 4–12 uppercase alphanumerics. The component validates the ID at runtime:

- A well-formed ID inlines the deferred loader.
- A missing or malformed ID logs a development warning and renders nothing on production.
- The build **never** fails for a malformed ID; the project contract is "missing = disabled, never break the build."

### IP addresses

GA4 does not log or store IP addresses by default. The project does not explicitly set `anonymize_ip: true` in the `gtag('config', ...)` call — the setting is unnecessary and would be redundant.

### Page views

The loader automatically calls `gtag('config', id, { send_page_view: false })` once consent is granted, then explicitly emits `page_view` via the `trackPageView(pathname, pageTitle)` helper. A module-scoped flag (`window.__industryxPageViewSent`) prevents duplicates if the loader re-activates on the same route.

GA4's automatic "Enhanced Measurement" page-view tracking is left enabled in the GA4 console, but it is suppressed here via `send_page_view: false` so the manual `page_view` event is the only page-view record GA4 receives.

## Consent Mode v2

The site implements GA4 Consent Mode v2 with the following defaults before any user choice:

| Key                       | Default  |
| ------------------------- | -------- |
| `analytics_storage`       | `denied` |
| `ad_storage`             | `denied` |
| `ad_user_data`            | `denied` |
| `ad_personalization`     | `denied` |

The `CookieConsent` component renders a banner on first visit. Clicking **Accept** sets every key to `granted`; clicking **Decline** explicitly stores `denied` (so the banner does not reappear). The decision is written to `localStorage` under `industryx:consent` and pushed to `gtag('consent', 'update', state)` so any pre-existing GA context picks it up.

The GA4 loader reads the stored decision before inlining the loader, and never calls `gtag('config', ...)` if `analytics_storage === 'denied'`. No analytics request leaves the browser until the user grants consent.

### Do Not Track

If `navigator.doNotTrack`, `window.doNotTrack`, or `navigator.msDoNotTrack` is set to `"1"` or `"yes"`, the cookie-consent banner is suppressed and `analytics_storage` stays denied. The site respects DNT even if the user later attempts to grant consent.

## AI referral sources

AI referral detection recognizes the following six hostnames. Unknown referrers are ignored rather than recorded as free-form text.

| Referrer host              | Source value |
| -------------------------- | ------------ |
| `chatgpt.com`              | `chatgpt`    |
| `perplexity.ai`            | `perplexity` |
| `claude.ai`                | `claude`     |
| `gemini.google.com`        | `gemini`     |
| `copilot.microsoft.com`    | `copilot`    |
| _kimi.com_                 | _omitted_    |

The `kimi.com` host is intentionally **not** in the referral list. The footer outbound link points to `https://www.kimi.com/code`, so any visitor who follows it and returns would self-refer. If a reliable separate Kimi referral signal is identified later, add it back to the list and update `src/lib/analytics/events.ts`.

## Event and label inventory

GA4 events emitted by the site:

| Event               | Trigger                                                    | Parameters                                           | Allowlisted label values                                                                                                  |
| ------------------- | ---------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `cta_click`         | Click on a CTA link or successful copy/install command.     | `destination`, `page_section`, `label`               | `hero-why-kimi`, `home-invitation`, `beginner-prerequisites`, `beginner-stage-one`, `beginner-cta`, `copy-install-unix`, `copy-install-brew`, `copy-install-windows` |
| `invitation_click`  | Click on a disclosed Kimi invitation link.                 | `destination`, `page_section`, `label`               | `home-invitation`, `coming-soon-invitation`, `workspace-sidebar-invitation`, `beginner-invitation` (reserved; no link yet) |
| `outbound_link`     | Click on any cross-origin `<a>` without an explicit event. | `destination`, `page_section`                        | `footer-kimi-code`, `footer-docs`, `footer-docs-interaction` (reserved), `footer-github-kimi`, `footer-credit-industryx` |
| `ai_referral`       | Detected once on first user interaction after activation.   | `source`                                             | One of `chatgpt`, `perplexity`, `claude`, `gemini`, `copilot`. No label.                                                  |
| `stage_complete`    | Beginner page checkbox toggled from incomplete to complete. | `stage_id`, `page_section`                           | No label. Stage id format: `stage-1`, `stage-2`, etc.                                                                     |
| `reading_milestone` | Reader scrolls past 25 / 50 / 75 / 100% of the page.         | `percent`, `page_path`, `page_section`               | No label.                                                                                                                |
| `404_view`          | Visitor lands on the not-found page.                       | `page_path` (sanitized: no query, no fragment)       | No label.                                                                                                                |
| `page_view`         | One per route change, manually emitted.                    | `page_path`, `page_title`                             | No label.                                                                                                                |

All events include the `page_section` custom dimension when a `data-analytics-section` attribute is present on the originating element. `page_section` is reserved for section names like `hero`, `install`, `invite`, `mobile-cta`, `footer`, `coming-soon-hero`, `coming-soon-fallback`, `workspace-sidebar`, `simulated-ai-desktop`, `beginner-hero`, `beginner-stage`, `main`.

### Label prefixes (for the snapshot test)

The rendered-HTML snapshot test in `src/lib/analytics/rendered-events.test.ts` asserts that every `data-analytics-label` starts with one of these prefixes:

- `footer-` (footer outbound links)
- `hero-` (home hero section)
- `home-` (home page-scoped invitation clicks)
- `install-` (home install section)
- `final-` (home final-invite section, reserved)
- `mobile-sticky-` (reserved)
- `coming-soon-` (coming-soon pages)
- `workspace-` (workspace sidebar)
- `stage-` (Beginner stage ids)
- `copy-install-` (Home install command copies)
- `beginner-` (Beginner page CTAs and reserved invitation label)
- `page-` (page-level custom dimension labels, reserved)

The `404_view`, `stage_complete`, `reading_milestone`, and `page_view` events do not require a `label` attribute and are excluded from the prefix check.

## Placement matrix

`home-invitation` is intentionally shared across Hero, Install, Final-Invite, and MobileCta placements to keep the GA4 event count manageable. To differentiate Hero-CTA-clicks from Mobile-sticky-bar clicks, query GA4 by `page_path` + `label = 'home-invitation'`, then compare traffic patterns by time-of-day or session depth rather than by label.

If finer-grained differentiation is needed, add a `page_section` parameter (already emitted) and filter on it instead of adding new labels.

## Reporting cadence

Review monthly:

- Vercel Web Analytics page views, top pages, referrers, and visitor trends.
- Search Console and Bing impressions, clicks, indexed pages, crawl problems, and query coverage.
- GA4 counts for the allowlisted events, if GA4 is enabled.
- AI referral distribution without attempting to identify individual visitors.
- Cookie-consent grant rate (`analytics_storage === 'granted` count vs. total sessions) — useful when evaluating whether the banner is suppressing analytics.
- Broken outbound citations and redirects to outdated official documentation.

Record content changes in `docs/content-freshness-log.md`. Update the inventory in `docs/content-inventory.md` every quarter.

## Failure-mode runbook

When GA4 numbers look wrong, work through these failure modes in order:

### 1. Missing or blank `NEXT_PUBLIC_GA_ID`

- **Symptom:** zero events in GA4.
- **Cause:** the env var is unset, blank, or contains whitespace only.
- **Fix:** set `NEXT_PUBLIC_GA_ID` in Vercel to a GA4-format id (`G-` + 4–12 uppercase alphanumerics). The deferred loader renders nothing for missing or malformed values; no requests are made. The build does not fail.
- **Verification:** check that the GA loader script is present in the production HTML. If absent, the component is correctly rendering nothing — set the env var.

### 2. GA script loading failure

- **Symptom:** GA4 configured but no requests arrive.
- **Cause:** the `googletagmanager.com/gtag/js` URL is blocked by a network policy, Content Security Policy, or the user's network.
- **Fix:** verify in browser DevTools Network tab that the gtag.js request returns `200`. If the request is blocked, the loader still records any `send()` calls in dev-mode warnings, confirming the upstream logic works.
- **Note:** the loader activates after first user `pointerdown` or `keydown`. No requests are made before that, even if the user views the page for a long time.

### 3. Deferred loader waiting for interaction

- **Symptom:** visitors who load a page but never click or press a key produce no events.
- **Cause:** by design. The deferred loader activates on first user interaction to avoid blocking the page's Largest Contentful Paint. Bounce-prone visitors (open, read, leave without clicking) do not activate GA4.
- **Fix:** this is intentional, not a bug. Use Vercel Web Analytics for bounce-aware traffic. If GA4 coverage matters, lower the activation trigger to `scroll` or `pointermove` — but be aware of the LCP regression.

### 4. Ad blocker or browser privacy

- **Symptom:** GA4 sees fewer events than Vercel Analytics sees page views.
- **Cause:** uBlock, Brave Shields, Firefox Enhanced Tracking Protection, or similar tools block `googletagmanager.com`.
- **Fix:** expected. Vercel Analytics uses a first-party endpoint that most blockers do not block; GA4 uses a third-party endpoint that does get blocked. Compare the two and accept the gap. Page-view parity is impossible without a proxy/edge-worker setup.

### 5. Consent not granted

- **Symptom:** events fire from the loader but GA4 shows none.
- **Cause:** the user accepted the cookie banner but denied analytics, or never accepted and DNT is not set. The cookie-consent banner defaults to `analytics_storage: 'denied'`; the loader never calls `gtag('config', ...)` while denied.
- **Fix:** check `localStorage.getItem('industryx:consent')` in the browser. The expected granted state is `{"analytics_storage":"granted","ad_storage":"granted","ad_user_data":"granted","ad_personalization":"granted"}`. If a user denies consent, no events will reach GA4 from that browser.

### 6. Duplicate page-view prevention

- **Symptom:** GA4 records two `page_view` events per route.
- **Cause:** both the manual `trackPageView()` call and GA4's Enhanced Measurement page-view tracking fire.
- **Fix:** the loader sends `send_page_view: false` to `gtag('config', ...)` to suppress Enhanced Measurement. The `__industryxPageViewSent` flag deduplicates manual emissions if the loader re-activates. If duplicates still appear, verify that the env var did not flip to a non-empty value mid-deploy, which can cause a partial page render where Enhanced Measurement initializes before the manual `send_page_view: false` override applies.

## Release gates

- `npm run check` runs types, lint, tests, static generation, and JSON-LD validation.
- `npm run lighthouse` audits the generated Home and Beginner pages. Reports remain local in `.lighthouseci/reports`.
- Confirm `robots.txt`, `sitemap.xml`, `llms.txt`, canonical tags, verification tags, and JSON-LD in `out/` before deployment.
- Validate production URLs again after deployment because local checks cannot detect hosting, DNS, or CDN problems.
- Validate that `out/*.html` still passes `src/lib/analytics/rendered-events.test.ts` (auto-fails in `npm run check`) — this guards against labels drifting outside the inventory.

## Search ownership and sitemap submission

1. Add the production site to Google Search Console and Bing Webmaster Tools.
2. Copy only the verification token into `GOOGLE_SITE_VERIFICATION` or `BING_SITE_VERIFICATION` in Vercel. Do not paste a full meta tag.
3. Deploy, confirm the verification meta tag appears in the generated page head, and complete ownership verification.
4. Submit `https://industryx-lab.vercel.app/sitemap.xml` in both services.
5. Inspect `/` and `/build-project/beginner` after material content changes. Coming Soon routes are intentionally `noindex` and absent from the sitemap.
