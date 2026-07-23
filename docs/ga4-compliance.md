# Google Analytics 4 Compliance

This document is the single source of truth for the site's GA4 implementation, consent contract, event inventory, and the failure modes that operators see in the dashboard. It is paired with the operator runbook in `docs/measurement.md`, which covers Vercel setup, search ownership, and the reporting cadence.

Update this file in the same PR that changes the event surface, the label inventory, or the consent behavior. The event allowlist and AI referral domains live in `src/lib/analytics/events.ts`; this file references them rather than restating them.

## Configuration

Set `NEXT_PUBLIC_GA_ID` in Vercel only when GA4 measurement is required. When blank or absent, the Google Analytics component renders nothing and the cookie-consent banner stays hidden (analytics remains denied).

### Measurement ID format

The measurement ID must match the GA4 format `G-` followed by 4-12 uppercase alphanumerics. The component validates the ID at runtime:

- A well-formed ID inlines the deferred loader.
- A missing or malformed ID logs a development warning and renders nothing on production.
- The build **never** fails for a malformed ID; the project contract is "missing = disabled, never break the build."

### IP addresses

GA4 does not log or store IP addresses by default. The project does not explicitly set `anonymize_ip: true` in the `gtag('config', ...)` call; the setting is unnecessary and would be redundant.

### Page views

The loader calls `gtag('config', id, { send_page_view: false })` once consent is granted, then explicitly emits `page_view` via the `trackPageView(pathname, pageTitle)` helper. A module-scoped flag (`window.__industryxPageViewSent`) prevents duplicates if the loader re-activates on the same route.

GA4's automatic "Enhanced Measurement" page-view tracking is left enabled in the GA4 console but is suppressed here via `send_page_view: false` so the manual `page_view` event is the only page-view record GA4 receives.

SPA route changes (Next.js client-side navigation) re-invoke `trackPageView(newPath)` so every navigation produces one `page_view` event.

## Consent Mode v2

The site implements GA4 Consent Mode v2 with region-specific defaults and the required privacy parameters. Before any user choice, the loader runs:

```js
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  region: [
    "AT",
    "BE",
    "BG",
    "CH",
    "CY",
    "CZ",
    "DE",
    "DK",
    "EE",
    "ES",
    "FI",
    "FR",
    "GR",
    "HR",
    "HU",
    "IE",
    "IS",
    "IT",
    "LI",
    "LT",
    "LU",
    "LV",
    "MT",
    "NL",
    "NO",
    "PL",
    "PT",
    "RO",
    "SE",
    "SI",
    "SK",
    "GB",
  ],
  wait_for_update: 500,
});
```

For visitors in regions outside the EEA + UK + Switzerland, the defaults are granted so the cookieless-ping model does not penalize non-regulated traffic.

### Required privacy parameters

| Parameter            | Default  | Purpose                                                                                                                                                    |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ad_storage`         | `denied` | Enables/disables advertising-related cookies and storage.                                                                                                  |
| `ad_user_data`       | `denied` | Sets consent for sending user data to Google for advertising purposes.                                                                                     |
| `ad_personalization` | `denied` | Sets consent for personalized advertising.                                                                                                                 |
| `analytics_storage`  | `denied` | Enables/disables analytics storage (cookies, etc.).                                                                                                        |
| `url_passthrough`    | `true`   | Passes click identifiers and ad parameters through URLs so cookieless pings can be stitched to consent-granted sessions. Required for Conversion Modeling. |
| `ads_data_redaction` | `true`   | When `ad_user_data` is `denied`, strips ad click identifiers from outgoing hits. Reduces GDPR exposure for denied traffic.                                 |

### Cookie consent banner

The `CookieConsent` component renders a banner on first visit when the user has not decided and DNT is off. Clicking **Accept** sets every key to `granted`; clicking **Decline** explicitly stores `denied` (so the banner does not reappear). The decision is written to `localStorage` under `industryx:consent` and pushed to `gtag('consent', 'update', state)` so any pre-existing GA context picks it up.

The GA4 loader reads the stored decision before inlining the loader and never calls `gtag('config', ...)` if `analytics_storage === 'denied'`. No analytics request leaves the browser until the user grants consent.

#### Banner disclosure copy

The banner text discloses: privacy policy link, the vendor list (Google), retention period, and that consent can be withdrawn. Required for Google's [EU User Consent Policy](https://www.google.com/about/company/user-consent-policy/).

#### Consent withdrawal

A "Manage cookies" link in the footer opens the banner again. Revocation pushes `gtag('consent', 'update', { analytics_storage: 'denied', ... })` and clears the GA4 cookie.

#### Consent expiry

Decisions expire after 395 days (the maximum duration allowed by the ICO under the [Data (Use and Access) Act 2025](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/)). After expiry the banner shows again on next visit.

### Do Not Track

If `navigator.doNotTrack`, `window.doNotTrack`, or `navigator.msDoNotTrack` is set to `"1"` or `"yes"`, the cookie-consent banner is suppressed and `analytics_storage` stays denied. The site respects DNT even if the user later attempts to grant consent.

## Event and label inventory

GA4 events emitted by the site. The allowlist lives in `src/lib/analytics/events.ts` (`essentialEventNames`); this file describes the contract.

| Event               | Trigger                                                            | Parameters                                     | Allowlisted label values                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cta_click`         | Click on a CTA link or successful copy/install command.            | `destination`, `page_section`, `label`         | `hero-why-kimi`, `home-invitation`, `beginner-prerequisites`, `beginner-stage-one`, `beginner-cta`, `copy-install-unix`, `copy-install-brew`, `copy-install-windows` |
| `invitation_click`  | Click on a disclosed Kimi invitation link.                         | `destination`, `page_section`, `label`         | `home-invitation`, `coming-soon-invitation`, `workspace-sidebar-invitation`, `beginner-invitation` (reserved; no link yet)                                           |
| `outbound_link`     | Click on any cross-origin `<a>` without an explicit event.         | `destination`, `page_section`                  | `footer-kimi-code`, `footer-docs`, `footer-docs-interaction` (reserved), `footer-github-kimi`, `footer-credit-industryx`                                             |
| `ai_referral`       | Detected once on first user interaction after activation.          | `source`                                       | One of `chatgpt`, `perplexity`, `claude`, `gemini`, `copilot`. No label.                                                                                             |
| `stage_complete`    | Beginner page checkbox toggled from incomplete to complete.        | `stage_id`, `page_section`                     | No label. Stage id format: `stage-1`, `stage-2`, etc.                                                                                                                |
| `reading_milestone` | Reader scrolls past 25 / 50 / 75 / 100% of the page.               | `percent`, `page_path`, `page_section`         | No label.                                                                                                                                                            |
| `404_view`          | Visitor lands on the not-found page.                               | `page_path` (sanitized: no query, no fragment) | No label.                                                                                                                                                            |
| `page_view`         | One per route change, manually emitted (including SPA navigation). | `page_path`, `page_title`                      | No label.                                                                                                                                                            |

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

## AI referral sources

AI referral detection recognizes the following five hostnames. Unknown referrers are ignored rather than recorded as free-form text.

| Referrer host           | Source value |
| ----------------------- | ------------ |
| `chatgpt.com`           | `chatgpt`    |
| `perplexity.ai`         | `perplexity` |
| `claude.ai`             | `claude`     |
| `gemini.google.com`     | `gemini`     |
| `copilot.microsoft.com` | `copilot`    |

The `kimi.com` host is intentionally **not** in the referral list. The footer outbound link points to `https://www.kimi.com/code`, so any visitor who follows it and returns would self-refer. If a reliable separate Kimi referral signal is identified later, add it back to `src/lib/analytics/events.ts` and the table above.

## Placement matrix

`home-invitation` is intentionally shared across Hero, Install, Final-Invite, and MobileCta placements to keep the GA4 event count manageable. To differentiate Hero-CTA-clicks from Mobile-sticky-bar clicks, query GA4 by `page_path` + `label = 'home-invitation'`, then compare traffic patterns by time-of-day or session depth rather than by label.

If finer-grained differentiation is needed, add a `page_section` parameter (already emitted) and filter on it instead of adding new labels.

## Failure-mode runbook

When GA4 numbers look wrong, work through these failure modes in order.

### 1. Missing or blank `NEXT_PUBLIC_GA_ID`

- **Symptom:** zero events in GA4.
- **Cause:** the env var is unset, blank, or contains whitespace only.
- **Fix:** set `NEXT_PUBLIC_GA_ID` in Vercel to a GA4-format id (`G-` + 4-12 uppercase alphanumerics). The deferred loader renders nothing for missing or malformed values; no requests are made. The build does not fail.
- **Verification:** check that the GA loader script is present in the production HTML. If absent, the component is correctly rendering nothing; set the env var.

### 2. GA script loading failure

- **Symptom:** GA4 configured but no requests arrive.
- **Cause:** the `googletagmanager.com/gtag/js` URL is blocked by a network policy, Content Security Policy, or the user's network.
- **Fix:** verify in browser DevTools Network tab that the gtag.js request returns `200`. If the request is blocked, the loader still records any `send()` calls in dev-mode warnings, confirming the upstream logic works.
- **Note:** the loader activates after first user `pointerdown` or `keydown`. No requests are made before that, even if the user views the page for a long time.

### 3. Deferred loader waiting for interaction

- **Symptom:** visitors who load a page but never click or press a key produce no events.
- **Cause:** by design. The deferred loader activates on first user interaction to avoid blocking the page's Largest Contentful Paint. Bounce-prone visitors (open, read, leave without clicking) do not activate GA4.
- **Fix:** this is intentional, not a bug. Use Vercel Web Analytics for bounce-aware traffic. If GA4 coverage matters, lower the activation trigger to `scroll` or `pointermove`; be aware of the LCP regression.

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

### 7. SPA route changes missing page_view

- **Symptom:** GA4 only records the initial page load; subsequent in-app route changes show no `page_view` events.
- **Cause:** the deferred loader fires `trackPageView` once on first interaction. Without a router hook, Next.js client-side navigation never re-triggers it.
- **Fix:** the layout wires `next/navigation`'s `usePathname` into a hook that calls `window.trackPageView(pathname, document.title)` on every path change. Confirm in GA4 DebugView that `page_view` fires on each route change.

## Release gates

- `npm run check` runs types, lint, tests, static generation, and JSON-LD validation.
- Validate that `out/*.html` still passes `src/lib/analytics/rendered-events.test.ts` (auto-fails in `npm run check`). This guards against labels drifting outside the inventory.
- After deployment, open GA4 DebugView and confirm: (1) `gtag('consent', 'default', ...)` fires before `gtag('config', ...)`, (2) `page_view` fires once per route including SPA navigation, (3) custom events have all four required parameters.
