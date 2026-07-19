import { CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { desktopSectionContent } from '../content/desktop'
import { KimiDesktop } from './KimiDesktop'

export function Desktop() {
  return (
    <section id="desktop" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div>
          <SectionHeading
            label={desktopSectionContent.label}
            title={desktopSectionContent.title}
            sub={desktopSectionContent.description}
            align="left"
          />

          <div className="mt-8 space-y-5">
            {desktopSectionContent.points.map((point, index) => (
              <Reveal key={point.title} delay={100 + index * 80}>
                <div className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={180}>
          <KimiDesktop />
          <p className="mt-4 text-center font-mono text-xs text-muted-foreground/70">
            {desktopSectionContent.caption}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
