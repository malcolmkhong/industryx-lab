import Image from "next/image"
import beginnerJourney from "@/assets/beginner-build-journey.webp"
import { GuideLayout } from "@/components/content/GuideLayout"
import { ReadingProgress } from "@/components/content/ReadingProgress"
import { EditorialByline } from "@/components/seo/EditorialByline"
import {
  beginnerPageContent,
  beginnerStages,
} from "./content"
import { SafeBuildLoop } from "./components/stages/SafeBuildLoop"
import { StageSection } from "./components/stages/StageSection"
import { BeginnerBreadcrumb } from "./components/sections/BeginnerBreadcrumb"
import { BeginnerHero } from "./components/sections/BeginnerHero"
import { BeginnerProgress } from "./components/sections/BeginnerProgress"
import { BeginnerPrerequisites } from "./components/sections/BeginnerPrerequisites"
import { BeginnerGlossary } from "./components/sections/BeginnerGlossary"
import { BeginnerCompletion } from "./components/sections/BeginnerCompletion"

const contents = [
  {
    id: beginnerPageContent.sections.beforeYouStart.id,
    label: beginnerPageContent.sections.beforeYouStart.title,
  },
  {
    id: beginnerPageContent.sections.safeBuildLoop.id,
    label: beginnerPageContent.sections.safeBuildLoop.ariaLabel,
  },
  ...beginnerStages.map((stage) => ({ id: stage.id, label: stage.title })),
  {
    id: beginnerPageContent.sections.glossary.id,
    label: beginnerPageContent.sections.glossary.title,
  },
]

export function BeginnerPage() {
  const {
    breadcrumb,
    hero,
    journey,
    progress: progressContent,
    sections,
  } = beginnerPageContent
  const totalStages = beginnerStages.length

  return (
    <main
      id="main-content"
      className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-6"
      role="main"
    >
      <ReadingProgress />
      <BeginnerBreadcrumb
        home={breadcrumb.home}
        buildProject={breadcrumb.buildProject}
        beginner={breadcrumb.beginner}
      />

      <BeginnerHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primaryAction={hero.primaryAction}
        secondaryAction={hero.secondaryAction}
        primaryHref={`#${sections.beforeYouStart.id}`}
        secondaryHref={`#${beginnerStages[0].id}`}
      />

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
        <figcaption className="border-t border-white/10 px-5 py-3 text-sm leading-6 text-muted-foreground">
          {journey.caption}
        </figcaption>
      </figure>

      <BeginnerProgress
        ariaLabel={progressContent.ariaLabel}
        eyebrow={progressContent.eyebrow}
        status={progressContent.status}
        completionAriaLabel={progressContent.completionAriaLabel}
        totalStages={totalStages}
      />

      <GuideLayout contents={contents}>
        <article className="space-y-12">
          <BeginnerPrerequisites section={sections.beforeYouStart} />

          <section
            id={sections.safeBuildLoop.id}
            className="scroll-mt-28 border-t border-white/10 pt-10"
            aria-label={sections.safeBuildLoop.ariaLabel}
          >
            <SafeBuildLoop
              eyebrow={sections.safeBuildLoop.eyebrow}
              heading={sections.safeBuildLoop.title}
              description={sections.safeBuildLoop.description}
              steps={sections.safeBuildLoop.steps}
              detailHeadingTemplate={
                sections.safeBuildLoop.detailHeadingTemplate
              }
            />
          </section>

          {beginnerStages.map((stage) => (
            <StageSection key={stage.id} stage={stage} />
          ))}

          <BeginnerGlossary section={sections.glossary} />

          <BeginnerCompletion
            section={sections.completion}
            totalStages={totalStages}
          />
        </article>
      </GuideLayout>
    </main>
  )
}