import { Github } from 'lucide-react'
import { MoonMark } from '@/components/MoonMark'
import { externalLinks, siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card/20" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5 text-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25">
              <MoonMark className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest">
              {siteConfig.brandName}
            </span>
          </div>
          <nav
            role="navigation"
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            aria-label="Footer navigation"
          >
            <a
              href={externalLinks.kimiCode}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              Official site
            </a>
            <a
              href={externalLinks.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              Docs
            </a>
            <a
              href={externalLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 text-xs leading-relaxed text-muted-foreground/70">
          <p>{siteConfig.disclaimer}</p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span>{siteConfig.footerCredit.prefix}</span>
            <a
              href={externalLinks.industryX}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-industryx-glow rounded-sm font-semibold focus-visible-ring touch-manipulation"
            >
              {siteConfig.footerCredit.name}
            </a>
          </p>
          <p>{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
