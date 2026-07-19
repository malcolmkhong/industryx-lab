import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { CopyButton } from './CopyButton'

afterEach(cleanup)

describe('CopyButton', () => {
  it('renders copy data without adding a React client boundary', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/CopyButton.tsx'), 'utf8')

    render(<CopyButton text="npm run dev" label="Copy command" />)

    expect(source).not.toMatch(/^['"]use client['"]/)
    expect(source).not.toContain('useCopy')
    expect(screen.getByRole('button', { name: 'Copy command' })).toHaveAttribute(
      'data-copy-text',
      'npm run dev',
    )
  })
})
