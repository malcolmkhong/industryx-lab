/// <reference types="node" />

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { routePaths } from '@/config/routes'

const root = process.cwd()

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const absolutePath = path.join(directory, entry)
    if (statSync(absolutePath).isDirectory()) return sourceFiles(absolutePath)
    return /\.(ts|tsx)$/.test(entry) ? [absolutePath] : []
  })
}

describe('project foundation', () => {
  it('uses documented feature and configuration boundaries', () => {
    const expectedFiles = [
      'AGENTS.md',
      'src/config/routes.ts',
      'src/config/site.ts',
      'src/features/home/HomePage.tsx',
      'src/features/beginner/BeginnerPage.tsx',
      'src/features/beginner/content/index.ts',
    ]

    for (const file of expectedFiles) {
      expect(existsSync(path.join(root, file)), `${file} should exist`).toBe(true)
    }

    expect(readFileSync(path.join(root, 'README.md'), 'utf8')).toContain('Kimi Beginner Guide Hub')
    expect(existsSync(path.join(root, 'pnpm-lock.yaml'))).toBe(false)
    expect(routePaths.beginner).toBe('/build-project/beginner')
  })

  it('keeps maintained source files below 300 lines', () => {
    const oversized = sourceFiles(path.join(root, 'src'))
      .map((file) => ({ file: path.relative(root, file), lines: readFileSync(file, 'utf8').split(/\r?\n/).length }))
      .filter(({ lines }) => lines > 300)

    expect(oversized).toEqual([])
  })
})
