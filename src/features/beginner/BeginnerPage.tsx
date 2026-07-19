'use client'

import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, Sparkles, TerminalSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import beginnerJourney from '@/assets/beginner-build-journey.webp'
import { GuideLayout } from '@/components/content/GuideLayout'
import { EditorialByline } from '@/components/seo/EditorialByline'
import { routePaths } from '@/config/routes'
import { beginnerGlossary, beginnerPageContent, beginnerPrerequisites, beginnerStages, safeBuildLoop } from './content'
import { StageSection } from './components/StageSection'
import { useGuideProgress } from './hooks/useGuideProgress'
import { formatContent } from './utils/formatContent'

const contents = [
  { id: beginnerPageContent.sections.beforeYouStart.id, label: beginnerPageContent.sections.beforeYouStart.title },
  { id: beginnerPageContent.sections.safeBuildLoop.id, label: beginnerPageContent.sections.safeBuildLoop.ariaLabel },
  ...beginnerStages.map((stage) => ({ id: stage.id, label: stage.title })),
  { id: beginnerPageContent.sections.glossary.id, label: beginnerPageContent.sections.glossary.title },
]

export function BeginnerPage() {
  const { breadcrumb, hero, journey, progress: progressContent, sections } = beginnerPageContent
  const { completedCount, completedStages, progress, toggleStage } = useGuideProgress(beginnerStages.length)

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-6 pb-20 pt-28" role="main">
      <div className="mb-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Link href={routePaths.home} className="hover:text-foreground focus-visible-ring">{breadcrumb.home}</Link>
        <span aria-hidden="true">/</span>
        <span>{breadcrumb.buildProject}</span>
        <span aria-hidden="true">/</span>
        <span className="text-primary">{breadcrumb.beginner}</span>
      </div>

      <header className="mb-10 max-w-4xl">
        <p className="mb-4 font-mono text-xs font-semibold tracking-[0.16em] text-primary">{hero.eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{hero.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{hero.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`#${sections.beforeYouStart.id}`} data-analytics-event="cta_click" data-analytics-label="beginner-prerequisites" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible-ring">
            {hero.primaryAction}
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={`#${beginnerStages[0].id}`} data-analytics-event="cta_click" data-analytics-label="beginner-stage-one" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-card/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-primary/10 focus-visible-ring">
            {hero.secondaryAction}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <EditorialByline className="mb-10 max-w-4xl" />

      <figure className="mb-10 overflow-hidden rounded-2xl border border-primary/20 bg-card/55">
        <Image
          src={beginnerJourney}
          alt={journey.alt}
          width={1749}
          height={899}
          className="aspect-[16/8] w-full object-cover"
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
        />
        <figcaption className="border-t border-white/10 px-5 py-3 text-sm leading-6 text-muted-foreground">{journey.caption}</figcaption>
      </figure>

      <section className="mb-10 rounded-2xl border border-primary/20 bg-primary/[0.055] p-5 sm:p-6" aria-label={progressContent.ariaLabel}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-primary">{progressContent.eyebrow}</p>
            <p className="mt-2 text-sm text-foreground">
              {formatContent(progressContent.status, {
                completed: completedCount,
                total: beginnerStages.length,
              })}
            </p>
          </div>
          <span className="font-mono text-lg font-semibold text-foreground">{progress}%</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label={progressContent.completionAriaLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <GuideLayout contents={contents}>
        <article className="space-y-12">
          <section id={sections.beforeYouStart.id} className="scroll-mt-24 border-t border-white/10 pt-10">
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">{sections.beforeYouStart.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{sections.beforeYouStart.title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{sections.beforeYouStart.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {beginnerPrerequisites.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-card/55 p-5">
                  <TerminalSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  <code className="mt-4 block overflow-x-auto rounded-md bg-black/25 px-3 py-2 font-mono text-xs text-foreground/85">{item.command}</code>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:text-foreground focus-visible-ring">
                    {sections.beforeYouStart.installationGuide} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-card/45 p-5 text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">{sections.beforeYouStart.loginLabel}</strong>{' '}
              {sections.beforeYouStart.loginBeforeCommand}{' '}
              <code className="font-mono text-primary">{sections.beforeYouStart.command}</code>,{' '}
              {sections.beforeYouStart.loginBeforeAction}{' '}
              <code className="font-mono text-primary">{sections.beforeYouStart.action}</code>,{' '}
              {sections.beforeYouStart.loginAfterAction}
            </div>
          </section>

          <section id={sections.safeBuildLoop.id} className="scroll-mt-24 border-t border-white/10 pt-10" aria-label={sections.safeBuildLoop.ariaLabel}>
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">{sections.safeBuildLoop.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{sections.safeBuildLoop.title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{sections.safeBuildLoop.description}</p>
            <div className="relative mt-7 grid gap-3 sm:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-6 hidden h-px overflow-hidden bg-white/10 sm:block" aria-hidden="true">
                <span className="flow-beam block h-full w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
              {safeBuildLoop.map((item, index) => (
                <div key={item.label} className="relative rounded-xl border border-white/10 bg-card/70 p-4 text-center">
                  <span className="mx-auto grid h-8 w-8 place-items-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary">{index + 1}</span>
                  <h3 className="mt-3 font-medium text-foreground">{item.label}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {beginnerStages.map((stage) => (
            <StageSection key={stage.id} stage={stage} complete={completedStages.has(stage.id)} onToggle={() => toggleStage(stage.id)} />
          ))}

          <section id={sections.glossary.id} className="scroll-mt-24 border-t border-white/10 pt-10">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">{sections.glossary.eyebrow}</p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{sections.glossary.title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{sections.glossary.description}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {beginnerGlossary.map((item) => (
                <div key={item.term} className="rounded-xl border border-white/10 bg-card/55 p-5">
                  <dt className="font-medium text-foreground">{item.term}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">{item.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-primary/25 bg-primary/[0.065] p-6 sm:p-8">
            <CheckCircle2 className="h-7 w-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-foreground">{sections.completion.title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{sections.completion.description}</p>
            <p className="mt-5 font-mono text-sm text-primary">
              {completedCount === beginnerStages.length
                ? sections.completion.allComplete
                : formatContent(sections.completion.stagesRemaining, {
                    remaining: beginnerStages.length - completedCount,
                  })}
            </p>
          </section>
        </article>
      </GuideLayout>
    </main>
  )
}
