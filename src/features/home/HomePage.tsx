'use client'

import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Desktop } from './components/Desktop'
import { Features } from './components/Features'
import { Install } from './components/Install'
import { Banner } from './components/Banner'
import { Invite } from './components/Invite'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { EditorialByline } from '@/components/seo/EditorialByline'
import { invitationLinks } from '@/config/site'

function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <>
      {/* sticky bottom CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-background/90 backdrop-blur-xl p-3 md:hidden">
        <a
          href={invitationLinks.subscribe}
          data-analytics-event="invitation_click"
          data-analytics-label="mobile-sticky-invitation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring"
        >
          Get invite code
        </a>
      </div>

      {/* back-to-top FAB */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring md:bottom-8"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  )
}

export function HomePage() {
  return (
    <>
      <main id="main-content" role="main">
        <Hero />
        <Stats />
        <Desktop />
        <Features />
        <Install />
        <div className="mx-auto max-w-6xl px-6 py-8">
          <EditorialByline />
        </div>
        <Banner />
        <Invite />
      </main>
      <MobileCTA />
    </>
  )
}

export default HomePage
