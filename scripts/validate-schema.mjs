import { readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'
import Ajv from 'ajv'

const outputDirectory = resolve('out')
const requiredTypes = ['Organization', 'Person', 'WebSite', 'WebPage']
const scriptPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g

const graphSchema = {
  type: 'object',
  required: ['@context', '@graph'],
  properties: {
    '@context': { const: 'https://schema.org' },
    '@graph': {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['@type'],
        properties: {
          '@type': {
            anyOf: [
              { type: 'string', minLength: 1 },
              { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
            ],
          },
        },
      },
    },
  },
}

function listHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? listHtmlFiles(path) : extname(path) === '.html' ? [path] : []
  })
}

function normalizeTypes(type) {
  return Array.isArray(type) ? type : [type]
}

const validate = new Ajv({ allErrors: true }).compile(graphSchema)
const failures = []
let graphCount = 0

for (const file of listHtmlFiles(outputDirectory)) {
  const document = readFileSync(file, 'utf8')
  const blocks = [...document.matchAll(scriptPattern)]
  if (blocks.length === 0) continue

  if (blocks.length !== 1) {
    failures.push(`${relative(outputDirectory, file)}: expected one JSON-LD block, found ${blocks.length}`)
    continue
  }

  try {
    const graph = JSON.parse(blocks[0][1])
    graphCount += 1
    if (!validate(graph)) {
      failures.push(`${relative(outputDirectory, file)}: ${JSON.stringify(validate.errors)}`)
      continue
    }

    const types = new Set(graph['@graph'].flatMap((item) => normalizeTypes(item['@type'])))
    for (const requiredType of requiredTypes) {
      if (!types.has(requiredType)) {
        failures.push(`${relative(outputDirectory, file)}: missing ${requiredType}`)
      }
    }
  } catch (error) {
    failures.push(`${relative(outputDirectory, file)}: invalid JSON-LD (${error.message})`)
  }
}

if (graphCount === 0) failures.push('No JSON-LD graphs were found in out/. Run npm run build first.')

if (failures.length > 0) {
  console.error(`Schema validation failed:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log(`Validated ${graphCount} generated JSON-LD graphs.`)
