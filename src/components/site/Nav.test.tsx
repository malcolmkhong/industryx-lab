import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { routePaths } from '@/config/routes'
import { Nav } from './Nav'

vi.mock('next/navigation', () => ({ usePathname: () => '/build-project/beginner' }))

afterEach(cleanup)

describe('Nav', () => {
  it('shows guide navigation without an invite or sign-in button', () => {
    render(<Nav />)

    expect(screen.getByRole('link', { name: 'HOME' })).toHaveAttribute('href', routePaths.home)
    expect(screen.getByRole('button', { name: 'Build Project' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Explore Agent' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Agent Resources' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Build Project' }))
    expect(screen.getByRole('menuitem', { name: 'Beginner' })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Intermediate' })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Advanced' })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Expert' })).toBeVisible()

    expect(screen.queryByRole('link', { name: /invite/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument()
  })

  it('keeps a dropdown open briefly while the pointer crosses to it', () => {
    vi.useFakeTimers()
    try {
      render(<Nav />)

      const buildProject = screen.getByRole('button', { name: 'Build Project' })
      const buildProjectGroup = buildProject.parentElement
      if (!buildProjectGroup) throw new Error('Build Project group is missing')

      fireEvent.mouseEnter(buildProjectGroup)
      fireEvent.mouseLeave(buildProjectGroup, { relatedTarget: document.body })

      expect(screen.getByRole('menu')).toBeVisible()

      act(() => vi.advanceTimersByTime(180))
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })
})
