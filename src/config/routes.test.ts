import { describe, expect, it } from 'vitest'
import {
  comingSoonRoutes,
  completedNavigationLinks,
  navigationGroups,
  routePaths,
} from './routes'

describe('route configuration', () => {
  it('provides a Coming Soon experience for every unfinished navigation route', () => {
    const unfinishedNavigationPaths = navigationGroups
      .flatMap((group) => group.items)
      .map((item) => item.href)
      .filter((path) => path !== routePaths.beginner)

    expect(comingSoonRoutes.map((route) => route.path)).toEqual(unfinishedNavigationPaths)
  })

  it('uses only completed routes as Coming Soon fallbacks', () => {
    const completedPaths = new Set<string>(completedNavigationLinks.map((link) => link.href))

    for (const route of comingSoonRoutes) {
      expect(route.pageName).not.toBe('')
      expect(route.description).not.toBe('')
      expect(route.expectedFeatures.length).toBeGreaterThan(0)
      expect(completedPaths.has(route.fallbackPath)).toBe(true)
    }
  })
})
