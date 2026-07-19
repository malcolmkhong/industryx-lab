'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MoonMark } from '@/components/MoonMark'
import { routePaths } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { Nav } from './Nav'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-background/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link
          href={routePaths.home}
          className="flex items-center gap-2.5 justify-self-start text-foreground focus-visible-ring touch-manipulation"
          aria-label={siteConfig.brandName}
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25"
            aria-hidden="true"
          >
            <MoonMark className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-semibold uppercase tracking-widest">
            {siteConfig.brandName}
          </span>
        </Link>

        <Nav />
      </div>
    </header>
  )
}
