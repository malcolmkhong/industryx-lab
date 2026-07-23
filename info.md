Using Node.js 20.19+, Next.js 16.2.10, React 19.2.0,
Tailwind CSS 3.4.19, TypeScript 5.9.3, and static App Router export.

Tailwind CSS is extended with a custom token layer (motion, surface, outline,
tracking, mockup font-size, z-index, disabled state, focus ring). No raw
arbitrary values are accepted for tokenized properties.

Setup complete: A:\kimi\app

UI primitives (in use): button, copy-button, dialog, empty-state, input,
label, menu-link, separator, textarea, toc-link, toggle.

Usage:
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { CopyButton } from '@/components/ui/CopyButton'

Structure:
src/app/ Static Next.js routes, layout, metadata, 404,
│ sitemap, robots, llms.txt, and \_components/
│ (ComingSoonRouteView, NotFoundTracker)
src/components/analytics/ Analytics + DeferredGoogleAnalytics
src/components/consent/ CookieConsent (uses useSyncExternalStore)
src/components/content/ GuideLayout, TableOfContents,
│ MobileContentsBar, ReadingProgress,
│ SectionHeading, Reveal
src/components/seo/ JsonLd, EditorialByline
src/components/site/ PageShell, SiteHeader, Nav, DesktopNav,
│ MobileMenuDropdown, Footer, MoonMark,
│ ProgressiveEnhancements
src/components/ui/ Visual primitives only
src/config/ Routes, navigation, site, URLs, commands
src/features/beginner/ Static Beginner content, UI, schema, tests
│ (components split into sections/ + stages/)
src/features/coming-soon/ Reusable unfinished-route experience
src/features/home/ Home content, sections, animations, schema
(components split into sections/, animations/, cta/)
src/hooks/ useBuildLoop, useDesktopAnimation, use-mobile
src/lib/analytics/ Event allowlist, sanitization, AI referral,
│ deferred GA loader, consent state, reading
│ milestones, stage tracking, rendered-events test
src/lib/browser/ Progressive enhancements, dropdown navigation,
│ mobile navigation, guide progress
src/lib/seo/ Metadata, schema, and coming-soon meta builders
src/lib/utils.ts Class-name utilities
src/styles/components/ progressive.css, toc.css
src/styles/motion/ home-motion.css
src/test/ Global Vitest setup
src/index.css Global theme tokens, utilities, and animations
scripts/validate-schema.mjs Generated JSON-LD release gate
scripts/lighthouse-setup.cjs Shared Chrome session for reliable LHCI runs
.github/workflows/quality.yml Automated checks for PRs and main
next.config.ts Static export and image configuration
lighthouserc.cjs Cross-platform Lighthouse CI thresholds
tailwind.config.js Tailwind theme, tokens, and content paths

Commands:
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
npm run start
npm run preview
npm run schema:check
npm run lighthouse
npm run check

Optional environment variables:
NEXT_PUBLIC_GA_ID
GOOGLE_SITE_VERIFICATION
BING_SITE_VERIFICATION

Production origin: https://industryx-lab.vercel.app
Static output: out/

Published routes:
/ Indexable Home page
/build-project/beginner Indexable eight-stage guide
8 additional configured routes Shared Coming Soon experience, noindex, follow
Unknown routes Static 404 page (noindex)

GA4 event allowlist (essentialEventNames in src/lib/analytics/events.ts):
cta_click, invitation_click, outbound_link, ai_referral, stage_complete,
reading_milestone, 404_view, page_view

Cookie consent:
Storage key: industryx:consent
Server snapshot: hidden (no banner).
Client snapshot: shown only when the user has not decided and DNT is off.
Pattern: useSyncExternalStore. No `typeof window` branches in render or
useState initializers. Consent updates dispatched via `industryx:consent-change`.

Design tokens (in src/index.css and tailwind.config.js):
Surface/outline --surface-overlay*, --outline-alpha*, --workspace-surface\*
Neon palette --neon-blue, --neon-violet, --neon-violet-soft, --neon-pink
Motion --motion-fast (150ms) | --motion-base (200ms) | --motion-slow
(300ms) | --motion-slower (500ms) | --motion-press | --motion-pop
Easing --motion-ease-out | --motion-ease-in-out
Tracking --tracking-eyebrow-tight (0.12em) | --tracking-eyebrow-default
(0.14em) | --tracking-eyebrow (0.16em) | --tracking-eyebrow-loose
(0.18em) | --tracking-display (-0.025em)
Mockup sizes text-mockup-2xs (10px) | text-mockup-xs (10.5px) |
text-mockup-sm (11px) | text-mockup-md (11.5px) |
text-mockup-lg (12px) | text-mockup-xl (12.5px)
Z-index --z-base | --z-dropdown | --z-sticky | --z-fixed | --z-modal |
--z-popover | --z-toast | --z-banner | --z-nav | --z-floating |
--z-skip-link

Border opacity rule: only border-white/5, /10, /15, /20 are valid Tailwind
classes. Anything else (e.g. /8) is silently dropped.

Disabled state rule: disabled:opacity-50 disabled:cursor-not-allowed.
Forbidden: disabled:opacity-65, disabled:opacity-75, disabled:cursor-default.

Focus ring rule: use the focus-visible-ring utility class.
Forbidden: focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2 repeated per element.

Rendering model:
App route files and metadata are statically rendered.
Home, Beginner, navigation, progress, copy, and Jump to render as static HTML.
A small post-hydration client boundary adds browser-only behavior without
hydrating those sections; Coming Soon retains its focused client boundary.
Browser state that affects markup (cookie consent visibility, viewport
detection, persisted UI state) uses useSyncExternalStore so the server
snapshot is deterministic and the client snapshot is read post-hydration.
No `typeof window`, `Date.now()`, `Math.random()`, or locale-dependent value
branches the initial server and client markup.

Repository boundary:
This repository owns the public IndustryX Lab content hub.
Supabase, Google OAuth, database, and application secrets belong to the
separate supabase-next-vercel-starter repository.

Static-export constraints:
No runtime API routes, request-time middleware, or server-dependent actions.
Next Image is exported with images.unoptimized enabled.
GitHub repository: https://github.com/malcolmkhong/industryx-lab
Primary branch: main

Line-length standard:
Maintained source-code files should remain below 500 physical lines.
Documentation, plans, generated files, and lockfiles are exempt.
