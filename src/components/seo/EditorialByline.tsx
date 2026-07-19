import { siteConfig } from '@/config/site'

export function EditorialByline({ className = '' }: { className?: string }) {
  return (
    <aside className={`rounded-xl border border-white/10 bg-card/45 p-5 ${className}`} aria-label="Editorial information">
      <p className="text-sm font-medium text-foreground">
        Written and maintained by{' '}
        <a href={siteConfig.author.url} target="_blank" rel="author noopener noreferrer" className="text-primary hover:text-foreground focus-visible-ring">
          {siteConfig.author.name}
        </a>
        , {siteConfig.author.role}.
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{siteConfig.author.bio}</p>
      <p className="mt-3 text-xs leading-5 text-muted-foreground/80">
        Published <time dateTime={siteConfig.editorial.datePublished}>July 19, 2026</time>
        {' · '}Last reviewed <time dateTime={siteConfig.editorial.dateModified}>July 19, 2026</time>
        {' · '}{siteConfig.editorial.reviewCadence}
      </p>
    </aside>
  )
}
