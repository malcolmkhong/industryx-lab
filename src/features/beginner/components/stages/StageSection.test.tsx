import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { beginnerStages } from '../../content'
import { StageSection } from './StageSection'

afterEach(cleanup)

const stage = beginnerStages[0]

describe('StageSection', () => {
  it('pairs expected result and checks in an unequal two-column grid', () => {
    render(<StageSection stage={stage} />)

    const expectedLabel = screen.getByText('EXPECTED RESULT')
    const pairedGrid = expectedLabel.closest('div.grid')
    expect(pairedGrid).toHaveClass('sm:grid-cols-[1.4fr_1fr]')
  })

  it('lays out common problems as a single column on mobile and two columns on large screens', () => {
    render(<StageSection stage={stage} />)

    const problemsHeading = screen.getByText('Common problems and fixes')
    const problemsGrid = problemsHeading.closest('details')?.querySelector('.grid')
    expect(problemsGrid).toHaveClass('lg:grid-cols-2')
    expect(screen.getByText(stage.commonProblems[0].problem)).toBeInTheDocument()
    expect(screen.getByText(stage.commonProblems[0].fix)).toBeInTheDocument()
  })

  it('keeps the follow-these-steps list as a single column', () => {
    render(<StageSection stage={stage} />)

    const stepsHeading = screen.getByText('FOLLOW THESE STEPS')
    const stepsList = stepsHeading.parentElement?.querySelector('ol')
    expect(stepsList).toHaveClass('space-y-4')
    expect(stepsList?.className).not.toMatch(/grid-cols-/)
  })
})
