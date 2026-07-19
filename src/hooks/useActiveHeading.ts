import { useEffect, useState } from 'react'

export function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')
  const idKey = ids.join('|')

  useEffect(() => {
    const headings = idKey
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => heading !== null)

    if (headings.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [idKey])

  return activeId
}
