import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, Sparkles, TerminalSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import beginnerJourney from '@/assets/beginner-build-journey.webp'
import { GuideLayout } from '@/components/content/GuideLayout'
import { ReadingProgress } from '@/components/content/ReadingProgress'
import { EditorialByline } from '@/components/seo/EditorialByline'
import { routePaths } from '@/config/routes'
import { beginnerGlossary, beginnerPageContent, beginnerPrerequisites, beginnerStages } from './content'
import { SafeBuildLoop } from './components/SafeBuildLoop'
import { StageSection } from './components/StageSection'
import { formatContent } from './utils/formatContent'

const contents = [
  { id: beginnerPageContent.sections.beforeYouStart.id, label: beginnerPageContent.sections.beforeYouStart.title },
  { id: beginnerPageContent.sections.safeBuildLoop.id, label: beginnerPageContent.sections.safeBuildLoop.ariaLabel },
  ...beginnerStages.map((stage) => ({ id: stage.id, label: stage.title })),
  { id: beginnerPageContent.sections.glossary.id, label: beginnerPageContent.sections.glossary.title },
]

export function BeginnerPage() {
  const { breadcrumb, hero, journey, progress: progressContent, sections } = beginnerPageContent
  const totalStages = beginnerStages.length

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-6" role="main">
      <ReadingProgress />
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
          <a
            href={`#${sections.beforeYouStart.id}`}
            data-analytics-event="cta_click"
            data-analytics-label="beginner-prerequisites"
            data-analytics-section="beginner-hero"
            className="tap-target inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible-ring"
          >
            {hero.primaryAction}
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={`#${beginnerStages[0].id}`}
            data-analytics-event="cta_click"
            data-analytics-label="beginner-stage-one"
            data-analytics-section="beginner-hero"
            className="tap-target inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-card/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-primary/10 focus-visible-ring"
          >
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

      <section
        className="mb-10 rounded-2xl border border-primary/20 bg-primary/[0.055] p-5 sm:p-6"
        aria-label={progressContent.ariaLabel}
        data-guide-progress
        data-total-stages={totalStages}
        data-status-template={progressContent.status}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-primary">{progressContent.eyebrow}</p>
            <p className="mt-2 text-sm text-foreground" data-guide-progress-status>
              {formatContent(progressContent.status, {
                completed: 0,
                total: totalStages,
              })}
            </p>
          </div>
          <span className="font-mono text-lg font-semibold text-foreground" data-guide-progress-percent>0%</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label={progressContent.completionAriaLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} data-guide-progressbar>
          <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: '0%' }} data-guide-progress-fill />
        </div>
      </section>

      <GuideLayout contents={contents}>
        <article className="space-y-12">
          <section id={sections.beforeYouStart.id} className="scroll-mt-28 border-t border-white/10 pt-10">
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">{sections.beforeYouStart.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{sections.beforeYouStart.title}</h2>
            <p className="mt-3 max-w-3xl prose-body leading-7 text-muted-foreground">{sections.beforeYouStart.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {beginnerPrerequisites.map((item) => (
                <div key={item.title} className="interactive-card rounded-xl border border-white/10 bg-card/55 p-5">
                  <TerminalSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  <code className="mt-4 block overflow-x-auto rounded-md bg-black/30 px-3 py-2 font-mono text-xs text-foreground/90">{item.command}</code>
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

          <section id={sections.safeBuildLoop.id} className="scroll-mt-28 border-t border-white/10 pt-10" aria-label={sections.safeBuildLoop.ariaLabel}>
            <SafeBuildLoop
              eyebrow={sections.safeBuildLoop.eyebrow}
              heading={sections.safeBuildLoop.title}
              description={sections.safeBuildLoop.description}
              steps={sections.safeBuildLoop.steps}
              detailHeadingTemplate={sections.safeBuildLoop.detailHeadingTemplate}
            />
          </section>

          {beginnerStages.map((stage) => (
            <StageSection key={stage.id} stage={stage} />
          ))}

          <section id={sections.glossary.id} className="scroll-mt-28 border-t border-white/10 pt-10">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">{sections.glossary.eyebrow}</p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{sections.glossary.title}</h2>
            <p className="mt-3 max-w-3xl prose-body leading-7 text-muted-foreground">{sections.glossary.description}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {beginnerGlossary.map((item) => (
                <div key={item.term} className="interactive-card rounded-xl border border-white/10 bg-card/55 p-5">
                  <dt className="font-medium text-foreground">{item.term}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">{item.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-primary/25 bg-primary/[0.065] p-6 sm:p-8">
            <CheckCircle2 className="h-7 w-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-foreground">{sections.completion.title}</h2>
            <p className="mt-3 max-w-3xl prose-body leading-7 text-muted-foreground">{sections.completion.description}</p>
            <p
              className="mt-5 font-mono text-sm text-primary"
              data-guide-completion
              data-all-complete={sections.completion.allComplete}
              data-remaining-template={sections.completion.stagesRemaining}
            >
              {formatContent(sections.completion.stagesRemaining, {
                remaining: totalStages,
              })}
            </p>
          </section>
        </article>
      </GuideLayout>
    </main>
  )
}
