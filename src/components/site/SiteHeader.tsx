import Link from 'next/link'
import { MoonMark } from '@/components/MoonMark'
import { routePaths } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { MobileNav } from './MobileNav'
import { Nav } from './Nav'

export function SiteHeader() {
  return (
    <>
      <header role="banner" className="site-header fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
          <Link
            href={routePaths.home}
            className="flex items-center gap-2.5 justify-self-start text-foreground focus-visible-ring touch-manipulation"
            aria-label={siteConfig.brandName}
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25"
              aria-hidden="true"
            >
              <MoonMark className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-widest">
              {siteConfig.brandName}
            </span>
          </Link>

          <Nav />
        </div>
      </header>
      <MobileNav />
    </>
  )
}
