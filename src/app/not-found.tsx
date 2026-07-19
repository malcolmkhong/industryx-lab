import type { Metadata } from 'next'
import Link from 'next/link'
import { routePaths } from '@/config/routes'
import { createPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Page Not Found',
  description: 'The requested IndustryX Lab guide page could not be found. Return home or continue with the available beginner project guide.',
  path: '/404',
  index: false,
})

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
      <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary">404 · PAGE NOT FOUND</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">This page does not exist.</h1>
      <p className="mt-5 max-w-xl leading-7 text-muted-foreground">The address may have changed, or the page may not have been published. Choose a working page below to continue learning.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={routePaths.home} className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground focus-visible-ring">Go to Home</Link>
        <Link href={routePaths.beginner} className="inline-flex min-h-11 items-center rounded-lg border border-white/10 bg-card/60 px-5 py-3 text-sm font-medium text-foreground focus-visible-ring">Open Beginner Guide</Link>
      </div>
    </main>
  )
}
