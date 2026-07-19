// @vitest-environment node

import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage static rendering', () => {
  it('renders without browser globals', () => {
    expect(() => renderToString(<HomePage />)).not.toThrow()
  })
})
