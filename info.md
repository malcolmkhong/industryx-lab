Using Node.js 20.19+, Next.js 16.2.10, React 19.2.0,
Tailwind CSS 3.4.19, TypeScript 5.9.3, and static App Router export.

Tailwind CSS uses the shared shadcn theme and responsive dark design system.

Setup complete: A:\kimi\app

Components (51):
  accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb,
  button, button-group, calendar, card, carousel, checkbox, collapsible,
  command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
  hover-card, input, input-group, input-otp, item, kbd, label, menubar,
  navigation-menu, pagination, popover, progress, radio-group, resizable,
  scroll-area, select, separator, sheet, skeleton, slider, sonner, spinner,
  switch, table, tabs, textarea, toggle, toggle-group, tooltip

Usage:
  import { Button } from '@/components/ui/button'
  import { Card, CardHeader, CardTitle } from '@/components/ui/card'

Structure:
  src/app/                     Static Next.js routes, layout, metadata, and 404
  src/components/analytics/    Vercel Web Analytics, optional GA4, and event tracking
  src/components/content/      Shared guide layout and table of contents
  src/components/seo/          JSON-LD and visible editorial details
  src/components/site/         SiteHeader, Nav, PageShell, and Footer
  src/components/ui/           Reusable shadcn/ui primitives
  src/config/                  Routes, navigation, site, URLs, and commands
  src/features/beginner/       Static Beginner content, UI, schema, and tests
  src/features/coming-soon/    Reusable unfinished-route experience
  src/features/home/           Home content, sections, CSS animation, and schema
  src/hooks/                   Focused hooks for client-only experiences
  src/lib/analytics/           Analytics contracts and deferred GA loader
  src/lib/browser/             Post-hydration progressive enhancements
  src/lib/seo/                 Metadata and structured-data builders
  src/styles/                  Navigation and home-motion styles
  src/test/                    Global Vitest setup
  src/index.css                Global theme, utilities, and shared animations
  scripts/validate-schema.mjs  Generated JSON-LD release gate
  scripts/lighthouse-setup.cjs Shared Chrome session for reliable LHCI runs
  .github/workflows/quality.yml Automated checks for PRs and main
  next.config.ts               Static export and image configuration
  lighthouserc.cjs             Cross-platform Lighthouse CI thresholds
  tailwind.config.js           Tailwind theme and content paths

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
  /                              Indexable Home page
  /build-project/beginner        Indexable eight-stage guide
  8 additional configured routes Shared Coming Soon experience, noindex
  Unknown routes                 Static 404 page

Rendering model:
  App route files and metadata are statically rendered.
  Home, Beginner, navigation, progress, copy, and Jump to render as static HTML.
  A small post-hydration client boundary adds browser-only behavior without
  hydrating those sections; Coming Soon retains its focused client boundary.

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
  Maintained source-code files should remain below 300 physical lines.
  Documentation, plans, generated files, and lockfiles are exempt.
