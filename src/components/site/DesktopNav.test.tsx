import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { DesktopNav } from './DesktopNav'

afterEach(cleanup)

describe('DesktopNav', () => {
  it('anchors the rightmost dropdown to the right edge so the popover does not overflow', () => {
    const { container } = render(<DesktopNav />)

    const groups = container.querySelectorAll<HTMLElement>('[data-nav-prefix]')
    expect(groups.length).toBeGreaterThan(0)

    const lastGroup = groups[groups.length - 1]
    const menu = lastGroup.querySelector<HTMLElement>('.nav-dropdown-menu')
    expect(menu).not.toBeNull()
    expect(menu?.className).toMatch(/\b(right-0)\b/)
  })

  it('does not right-anchor inner dropdowns', () => {
    const { container } = render(<DesktopNav />)

    const groups = container.querySelectorAll<HTMLElement>('[data-nav-prefix]')
    // All groups except the last should keep the default left-anchored positioning.
    Array.from(groups).slice(0, -1).forEach((group) => {
      const menu = group.querySelector<HTMLElement>('.nav-dropdown-menu')
      expect(menu).not.toBeNull()
      expect(menu?.className).not.toMatch(/\b(right-0)\b/)
    })
  })

  it('does not hard-code aria-expanded on the trigger so JS owns the state', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/site/DesktopNav.tsx'), 'utf8')

    expect(source).not.toMatch(/aria-expanded="false"/)
  })
})
