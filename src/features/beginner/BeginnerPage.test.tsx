import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { installProgressiveEnhancements } from '@/lib/browser/progressiveEnhancements'
import { BeginnerPage } from './BeginnerPage'
import { beginnerPageContent, beginnerStages } from './content'

afterEach(cleanup)

beforeAll(() => {
  installProgressiveEnhancements()
})

afterAll(() => {
  delete (window as Window & { __industryxEnhancementsInstalled?: boolean })
    .__industryxEnhancementsInstalled
})

describe('Beginner page', () => {
  it('keeps the long guide outside the React client bundle', () => {
    for (const file of [
      'src/features/beginner/BeginnerPage.tsx',
      'src/features/beginner/components/StageSection.tsx',
      'src/features/beginner/components/CodeCard.tsx',
      'src/components/content/TableOfContents.tsx',
    ]) {
      const source = readFileSync(join(process.cwd(), file), 'utf8')
      expect(source, file).not.toMatch(/^['"]use client['"]/)
      expect(source, file).not.toContain('useGuideProgress')
      expect(source, file).not.toContain('useActiveHeading')
      expect(source, file).not.toContain('useCopy')
    }
  })

  it('keeps page-level copy in the Beginner content module', () => {
    expect(beginnerPageContent.hero.title).toBe('Build a task manager with Kimi Code')
    expect(beginnerPageContent.sections.beforeYouStart.title).toBe('Before you start')
    expect(beginnerStages[0].callout?.linkLabel).toBe('http://localhost:3000/')
  })

  it('renders the beginner guide with generated Jump to links', { timeout: 15000 }, () => {
    render(<BeginnerPage />)

    expect(screen.getByRole('heading', { name: 'Build a task manager with Kimi Code' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Clone the starter kit' })).toBeInTheDocument()
    expect(screen.getByText(/git clone https:\/\/github\.com\/malcolmkhong\/supabase-next-vercel-starter\.git\s+cd supabase-next-vercel-starter/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'http://localhost:3000/' })).toHaveAttribute('href', 'http://localhost:3000/')
    const jumpTo = screen.getByRole('navigation', { name: 'Jump to' })
    expect(jumpTo).toBeInTheDocument()
    expect(jumpTo.closest('aside')).toHaveClass('sticky', 'top-28', 'self-start')
    expect(within(jumpTo).getByRole('link', { name: 'Clone the starter kit' })).toHaveAttribute('href', '#clone-starter')
    expect(within(jumpTo).getByRole('link', { name: 'Set up Supabase' })).toHaveAttribute('href', '#supabase')
    expect(screen.getByRole('heading', { name: 'Deploy your app' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /journey from starter kit to deployed app/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Safe build loop' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Beginner glossary' })).toBeInTheDocument()
    expect(screen.getByText(/Written and maintained by/)).toBeInTheDocument()
  })

  it('tracks completed stages', () => {
    render(<BeginnerPage />)

    expect(screen.getByText('0 of 8 stages complete')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('checkbox', { name: 'Mark Clone the starter kit complete' }))
    expect(screen.getByText('1 of 8 stages complete')).toBeInTheDocument()
  })

  it('renders a mobile contents bar and a reading progress bar so guide readers always know where they are', () => {
    render(<BeginnerPage />)

    expect(document.querySelector('[data-mobile-contents]')).toBeInTheDocument()
    expect(document.querySelector('[data-reading-progress]')).toBeInTheDocument()
  })

  it('uses varied responsive grids for prerequisites, the safe build loop, and the glossary', () => {
    render(<BeginnerPage />)

    const prerequisitesGrid = screen.getByText('Git').closest('div.grid')
    const safeBuildLoopList = screen.getByRole('list', { name: 'Safe build loop' })
    expect(safeBuildLoopList).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-4')
    const glossarySection = screen.getByRole('heading', { name: 'Beginner glossary' }).closest('section')
    const glossaryGrid = glossarySection?.querySelector('dl')

    expect(prerequisitesGrid).toHaveClass('md:grid-cols-3')
    expect(glossaryGrid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-3')
    // Every step button in the safe build loop must meet the tap-target
    // minimum so the row stays touchable on mobile.
    const stepButtons = within(safeBuildLoopList).getAllByRole('button')
    for (const button of stepButtons) {
      expect(button.className.split(/\s+/)).toContain('min-h-11')
    }
  })

  it('gives every stage the detail needed for a runnable guide', () => {
    expect(beginnerStages).toHaveLength(8)

    for (const stage of beginnerStages) {
      const detailedStage = stage as typeof stage & {
        answer: string
        prerequisites: string[]
        steps: Array<{ title: string; body: string }>
        checks: string[]
        commonProblems: Array<{ problem: string; fix: string }>
        references: Array<{ label: string; href: string }>
      }

      expect(detailedStage.answer.length).toBeGreaterThan(40)
      expect(detailedStage.prerequisites.length).toBeGreaterThan(0)
      expect(detailedStage.steps.length).toBeGreaterThanOrEqual(3)
      expect(detailedStage.checks.length).toBeGreaterThanOrEqual(2)
      expect(detailedStage.commonProblems.length).toBeGreaterThan(0)
      expect(detailedStage.references.length).toBeGreaterThan(0)
    }
  })
})
