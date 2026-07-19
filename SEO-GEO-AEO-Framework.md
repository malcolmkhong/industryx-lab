# SEO · GEO · AEO Framework

**Version 1.0 — July 2026**
An industry-standard framework for making every important page **discoverable, indexable, understandable, and citation-ready** — for human searchers, AI retrieval systems, and answer engines alike.

---

## 1. The Core Model

| Layer | Full name | Optimizes for | Success looks like |
|---|---|---|---|
| **SEO** | Search Engine Optimization | Traditional search engines (Google, Bing) ranking pages for humans | Rankings, organic traffic, CTR, engagement |
| **GEO** | Generative Engine Optimization | AI search & generative platforms (ChatGPT, Perplexity, Gemini, Claude, AI Overviews) | Being understood, trusted, retrieved, and **cited** accurately |
| **AEO** | Answer Engine Optimization | Answer engines, assistants, voice, featured snippets, direct answers | Being returned **as** the answer |

**Core distinction:**

- **SEO** helps search engines *rank* content for humans.
- **GEO** helps generative AI systems *understand and cite* content.
- **AEO** helps answer engines *return content as a direct answer*.

**The stack principle:** SEO is table stakes. Generative engines pull from the same indexes that power Google and Bing — if a page is not crawlable, indexed, and relevant, no GEO or AEO tactic on top will save it. Classic SEO is necessary but no longer sufficient; GEO and AEO are layered on top.

---

## 2. Non-Negotiable Principles

These govern every requirement below. They align with Google's helpful-content and spam policies and with how LLM retrieval systems select sources.

1. **User value first.** Every page must exist to help a human accomplish something. Content written for algorithms fails all three layers.
2. **E-E-A-T everywhere.** Demonstrate Experience, Expertise, Authoritativeness, Trust: named authors, verifiable credentials, first-hand evidence, cited sources.
3. **Factual accuracy.** Every statistic carries a source and a date. Every claim is checkable. Nothing fabricated — ever.
4. **No prohibited tactics** (§11): keyword stuffing, cloaking, hidden text, duplicated or thin content, misleading claims, fake reviews, fabricated quotes/citations, or mass unreviewed AI-generated content.
5. **One source of truth.** Structured data must exactly match visible content. Metadata must describe the page honestly.
6. **Machine readability is a feature, not a hack.** Semantic HTML and schema are how you speak clearly to machines — not a way to manipulate rankings.

---

## 3. Technical Requirements (T-Series)

| ID | Requirement | Standard | How to validate |
|---|---|---|---|
| T1 | Crawlability & indexation | Important pages return HTTP 200, are linked internally, not blocked by robots.txt or stray `noindex` | Search Console URL Inspection; crawl with Screaming Frog |
| T2 | XML sitemap | `sitemap.xml` lists all canonical URLs, auto-updated, submitted in GSC/Bing | GSC Sitemaps report |
| T3 | robots.txt | Explicit allow rules; **never block live-retrieval AI bots** (see T9) | robots.txt tester |
| T4 | Semantic HTML | Exactly one `<h1>`; logical heading order; landmarks `<header> <nav> <main> <footer>`; lists for enumerations; `<table>` for tabular data; `<time datetime>` for dates | W3C validator; heading-outline audit |
| T5 | Titles & meta descriptions | Unique per page; title ≤ 60 chars, front-loaded; description ≤ 155 chars, accurate, contains the answer hook | SERP preview tool; sitewide duplicate check |
| T6 | Canonicalization | One canonical URL per page; redirects 301 (not 302); no duplicate content across URLs | Crawl + `rel=canonical` audit |
| T7 | Social metadata | Open Graph (`og:type/title/description/image/site_name`) + Twitter card on every shareable page | OpenGraph debugger |
| T8 | Structured data | JSON-LD only, combined in one `@graph`; types per §8; **must mirror visible content**; validate before ship | Google Rich Results Test + Schema.org validator |
| T9 | AI crawler policy | Allow live-retrieval bots: `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User`, `Googlebot`, `Bingbot`. Training bots (`GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`) are an explicit, documented opt-in/out decision. Note: OpenAI states sites blocking `OAI-SearchBot` do not appear in ChatGPT search answers | robots.txt review each quarter |
| T10 | llms.txt | Plain-text manifest at site root summarizing the site, key facts, and priority links (standard proposed by Jeremy Howard, 2024; 800k+ sites by 2026; now part of Chrome Lighthouse's Agentic Browsing audit) | Fetch `/llms.txt`; review quarterly |
| T11 | Performance (Core Web Vitals) | **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1** (75th percentile, field data). Images: WebP/AVIF, explicit `width`/`height`, lazy-load below the fold. Fonts: `font-display: swap` | Lighthouse ≥ 90; CrUX/PageSpeed Insights |
| T12 | Mobile usability | Responsive layout, viewport meta, tap targets ≥ 44px, no intrusive interstitials | Lighthouse; real-device pass |
| T13 | Security | HTTPS everywhere, HSTS, no mixed content | SSL Labs; browser audit |
| T14 | Internationalization (if applicable) | `hreflang` pairs, locale-specific URLs, translated metadata — never auto-redirect by IP | GSC International Targeting; crawl |
| T15 | Rendering | Critical content present in server-rendered HTML (SSR/SSG) — AI crawlers execute little or no JavaScript | View-source vs. rendered diff |

---

## 4. Content Requirements (C-Series)

| ID | Requirement | Standard |
|---|---|---|
| C1 | Intent-mapped research | Each page targets one primary intent + mapped sub-questions (keywords **and** conversational prompts). Document the mapping in the content brief |
| C2 | Answer-first structure | The first 150 words contain a direct answer to the page's core question. Every question heading is followed immediately by an **answer capsule: 40–60 words, declarative, self-contained, quotable** |
| C3 | Headings that mirror language | Descriptive or question-based H2/H3 using the words users actually type ("How do I install X?"), not vague labels ("Overview") |
| C4 | Query fan-out coverage | Because AI search breaks questions into parallel sub-queries, each pillar page explicitly answers the obvious sub-questions (what, why, how, vs., pricing, problems) |
| C5 | Statistics with provenance | Replace vague claims with specific numbers; each stat carries a source + year. GEO studies show structured stats/quotes/lists lift AI visibility 30–40% |
| C6 | Entity clarity | Consistent naming for brand/product/people across the site and the web. Open sections with definition leads: *"X is a [category] that [differentiator]."* |
| C7 | E-E-A-T signals | Named author with credentials + bio; first-hand evidence (screenshots, tests, original data); attributed expert quotes — never anonymous "experts say" |
| C8 | FAQ blocks | Real user questions, concise answers, visible on the page (not only in schema), paired with FAQPage markup |
| C9 | Readability | Short sentences; ~grade-8 reading level; scannable with lists and tables where they aid comprehension |
| C10 | Freshness | Visible published/updated dates; `dateModified` in schema updated on every edit; core pages reviewed **at least quarterly** (pages stale > 3 months lose AI citations measurably) |
| C11 | Information gain | Every page must add something the index doesn't already have — original data, firsthand experience, unique synthesis. Rehashed listicles and unreviewed AI drafts are rejected at review |
| C12 | Media accessibility | Descriptive alt text on informative images (decorative images get empty `alt=""`); captions for charts; transcripts for video/audio |

---

## 5. SEO Workstream

**Objective:** rankings → impressions → clicks → engaged sessions.

- **Keyword research:** map terms to intent (informational / commercial / transactional / navigational); one primary intent per URL; track cannibalization.
- **On-page:** titles, descriptions, headings, internal anchor text, media optimization per §3–§4.
- **Internal linking:** every important page reachable within 3 clicks of home; contextual links with descriptive anchors; hub pages link down to spokes and spokes back up.
- **Backlinks & digital PR:** earn links via original research, tools, and expert commentary — never buy links or run link schemes.
- **CTR optimization:** test titles for curiosity + clarity balance; win rich results (FAQ, breadcrumbs, review stars) where eligible.

**KPIs:** keyword positions (top-3 / top-10 counts), impressions & CTR (GSC), organic sessions and engaged-session rate (GA4), referring domains, index coverage.

---

## 6. GEO Workstream

**Objective:** be retrieved, trusted, and cited inside AI-generated answers.

Evidence-based citability levers (Princeton GEO study; 2025–26 industry measurement):

1. **Statistics addition** — strongest measured tactic; numbers are extractable, falsifiable, quotable.
2. **Inline citations to authoritative sources** — citing trustworthy sources makes you a trustworthy source (largest gains for lower-ranked sites, up to +115% visibility in the Princeton study).
3. **Attributed expert quotations** — name + title + organization.
4. **Answer capsules** (40–75 words) — highest-correlation format with ChatGPT citations.
5. **Fluent, confident professional prose** — LLMs preferentially extract from it.
6. **Query fan-out coverage** (see C4).
7. **Off-page entity building** — consistent brand facts across Wikipedia/Wikidata, Reddit, review platforms (G2/Capterra/Trustpilot), YouTube, and trade press. ~85% of AI brand mentions originate from third-party sources; generative engines verify brand truth by cross-web consensus.
8. **Technical access** — T8/T9/T10: schema, open AI crawlers, llms.txt.
9. **Freshness** — recency is a ranking signal in AI retrieval (Perplexity especially); refresh quarterly with visible dates.

**KPIs:** citation rate across a fixed 20-prompt panel tested monthly on ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews; AI share-of-voice vs. competitors; AI-referral sessions (GA4 channel group); branded-search volume (lagging entity-strength indicator); accuracy of AI-stated facts about the brand (sentiment/fact drift log).

---

## 7. AEO Workstream

**Objective:** own the direct answer — featured snippets, AI Overview citations, voice responses.

- **Question research:** mine People-Also-Ask, support tickets, sales calls, community threads, and actual AI-assistant prompts.
- **Answer formats matched to query type:** definition paragraph for "what is"; numbered steps for "how to"; tables for comparisons; bullet lists for enumerations. Lead each with the 40–60 word capsule (C2).
- **Schema pairing:** FAQPage for Q&A blocks, HowTo for processes, Speakable where voice matters. Schema only for content visible on the page.
- **Snippet-first discipline:** content that wins featured snippets is disproportionately pulled into AI Overviews — target snippet ownership as the leading indicator.
- **Conversational intent:** write the way people speak to assistants; complete-sentence questions and complete-sentence answers.

**KPIs:** featured-snippet ownership count for target questions; AI Overview citation presence; direct-answer rate on the prompt panel (overlaps GEO KPI); voice-read checks on assistant devices.

---

## 8. Structured Data Standard

| Page type | Required JSON-LD types |
|---|---|
| Site-wide | `Organization` (or `Person` for personal sites) + `WebSite` |
| Every page | `WebPage` (+ `BreadcrumbList` where hierarchy exists) |
| Product/tool page | `SoftwareApplication` or `Product` (never fabricate `offers`/`aggregateRating`) |
| FAQ block | `FAQPage` |
| Step-by-step guide | `HowTo` |
| Editorial content | `Article`/`BlogPosting` with `Person` author, `datePublished`, `dateModified` |
| Voice-targeted | `SpeakableSpecification` (beta) |

**Rules:**
- One `@graph` per page; JSON-LD format only.
- Markup must mirror visible content exactly — marking up invisible content violates Google guidelines.
- Validate with **both** Google Rich Results Test and Schema.org validator before every release.
- Update `dateModified` on every content change.

---

## 9. Measurement Framework

| Area | Metric | Target | Tool | Cadence |
|---|---|---|---|---|
| SEO | Top-10 keyword positions | +QoQ growth | GSC / rank tracker | Monthly |
| SEO | Organic CTR | ≥ SERP-position benchmark | GSC | Monthly |
| SEO | Organic engaged sessions | +QoQ growth | GA4 | Monthly |
| GEO | Prompt-panel citation rate (20 fixed prompts × 5 engines) | ≥ 40% within 2 quarters; track trend | Manual panel / AI-visibility tool | Monthly |
| GEO | AI-referral sessions | +QoQ growth | GA4 custom channel | Monthly |
| GEO | Branded search volume | +QoQ growth | GSC / trends | Quarterly |
| GEO | Fact & sentiment accuracy in AI answers | 100% factual; drift logged & corrected | Manual panel | Monthly |
| AEO | Featured snippets owned (target set) | +QoQ growth | Rank tracker | Monthly |
| AEO | AI Overview presence for target questions | Growing share | Manual panel | Monthly |
| Conversion | Primary CTA conversion rate | ≥ baseline set at launch | GA4 events | Monthly |
| Quality | CWV pass rate (field data) | 100% of pageviews "Good" | CrUX | Monthly |
| Quality | Lighthouse (perf/a11y/best-practices/SEO) | ≥ 90 all categories | CI check | Every release |
| Quality | Core-page freshness | 100% reviewed within 90 days | Content inventory | Quarterly |

---

## 10. Validation Checks (Pre-Publish Gate)

A page ships only when every box is ticked:

- [ ] Returns 200; indexable; in sitemap; internally linked
- [ ] Unique title ≤ 60 chars and description ≤ 155 chars; accurate
- [ ] Single `<h1>`; logical heading outline; semantic landmarks
- [ ] Answer capsule present in first 150 words
- [ ] Every statistic has source + year; every claim verifiable
- [ ] JSON-LD `@graph` validates (Rich Results Test + Schema.org) and mirrors visible content
- [ ] FAQ (if present) visible on page and identical to FAQPage markup
- [ ] Images optimized (WebP/AVIF), dimensioned, lazy-loaded, alt text correct
- [ ] LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1 in lab test; Lighthouse ≥ 90
- [ ] Mobile rendering pass; tap targets ≥ 44px
- [ ] robots.txt still allows retrieval bots; llms.txt updated if site structure changed
- [ ] Dates visible on page; `dateModified` bumped
- [ ] Disclosure/affiliation statements present where required
- [ ] No prohibited practices (§11) anywhere in the change set

---

## 11. Prohibited Practices

1. Keyword stuffing or irrelevant keyword lists.
2. Cloaking, hidden text, sneaky redirects, doorway pages.
3. Duplicated or thin content; mass-produced pages without original value.
4. Unreviewed AI-generated content published at scale.
5. Misleading claims, fabricated statistics, invented quotes or citations.
6. Fake reviews, astroturfing, purchased links, link schemes.
7. Schema markup for content not visible on the page.
8. Blocking AI retrieval crawlers while expecting AI citations.
9. Scraping or re-publishing third-party content without adding value.

---

## 12. Ongoing Monitoring Rules

| Cadence | Rules |
|---|---|
| **Weekly** | GSC coverage/performance anomalies; uptime; CWV field-data drift |
| **Monthly** | Rankings & CTR review; 20-prompt AI citation panel; AI-referral traffic; fact/sentiment drift log; conversion review |
| **Quarterly** | Full content refresh of core pages (stats, examples, dates); schema audit; backlink & mention audit; competitor citation-gap analysis; robots.txt/llms.txt review |
| **Event-triggered** | Traffic drop > 20% WoW → same-week diagnosis. Product/fact changes → same-day content + `dateModified` update. New AI engine/crawler emerges → policy review within 2 weeks |

Every change is logged: date, page, what changed, why, expected KPI effect. GEO/AEO is a repeatable visibility system, not a one-time setup.

---

## Appendix A — Reference Implementation: the Kimi Code invitation page

This framework is applied to the landing page built alongside this document:

| Framework item | Implementation |
|---|---|
| T4 semantic HTML | One `<h1>`; ordered H2/H3; `<header> <nav> <main> <footer>` landmarks; skip link |
| T5 metadata | Optimized title/description; OG + Twitter cards; robots meta with `max-image-preview:large` |
| T8 structured data | Single JSON-LD `@graph`: `WebSite`, `WebPage`, `SoftwareApplication` (Kimi Code, author Moonshot AI), `FAQPage` |
| T9 AI crawlers | robots.txt explicitly allows OAI-SearchBot, ChatGPT-User, PerplexityBot(-User), Claude-SearchBot, Claude-User, Google-Extended, Bingbot |
| T10 llms.txt | Root llms.txt with site summary, key facts, official links |
| T11 performance | Images converted to WebP with explicit dimensions; lazy-loading |
| C2/C8 answer capsules & FAQ | Visible FAQ section — five question-headings, each with a 36–48 word direct answer, mirrored 1:1 in FAQPage schema |
| C5 statistics | Stats strip carries verifiable figures (1M context, #1 Frontend Code Arena, 6.3× decoding, 2.8T params) |
| Trust/disclosure | Visible "not affiliated with Moonshot AI" disclaimer in FAQ and footer |

---

*Sources informing this framework include: Google Search Central documentation and spam policies; the Princeton GEO study (Aggarwal et al.); Search Engine Land's 2026 GEO guide; Schema.org; web.dev Core Web Vitals; and the llms.txt specification. Standards reviewed July 2026 — revisit quarterly per §12.*
