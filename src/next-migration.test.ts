// @vitest-environment node

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '..')
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

describe('Next.js static-generation foundation', () => {
  it('uses Next.js commands without the obsolete Vite router stack', () => {
    expect(packageJson.scripts.dev).toBe('next dev')
    expect(packageJson.scripts.build).toBe('next build')
    expect(packageJson.scripts.start).toBe('serve out -l 3000')
    expect(packageJson.dependencies).not.toHaveProperty('react-router')
    expect(packageJson.devDependencies).not.toHaveProperty('vite')
  })

  it('provides App Router entries for every public experience', () => {
    const requiredFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/build-project/beginner/page.tsx',
      'src/app/build-project/intermediate/page.tsx',
      'src/app/build-project/advanced/page.tsx',
      'src/app/build-project/expert/page.tsx',
      'src/app/explore-agent/kimi/page.tsx',
      'src/app/explore-agent/minimax/page.tsx',
      'src/app/explore-agent/codex/page.tsx',
      'src/app/github/skills/page.tsx',
      'src/app/github/mcp/page.tsx',
      'src/app/not-found.tsx',
    ]

    for (const file of requiredFiles) {
      expect(existsSync(resolve(root, file)), file).toBe(true)
    }
  })

  it('removes obsolete Vite application entries after migration', () => {
    for (const file of ['src/App.tsx', 'src/main.tsx', 'index.html', 'vite.config.ts', 'vercel.json']) {
      expect(existsSync(resolve(root, file)), file).toBe(false)
    }
  })
})
