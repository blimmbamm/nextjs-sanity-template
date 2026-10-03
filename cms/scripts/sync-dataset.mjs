/**
 * Copy one Sanity dataset over another (export → import --replace).
 *
 * Usage:
 *   node scripts/sync-dataset.mjs prod-to-dev
 *   node scripts/sync-dataset.mjs dev-to-prod
 *
 * Always asks for explicit y/N confirmation before writing.
 */

import {execSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import {stdin as input, stdout as output} from 'node:process'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TMP_ARCHIVE = path.join(__dirname, '..', 'tmp-dataset-sync.tar.gz')

const DIRECTIONS = {
  'prod-to-dev': {source: 'production', target: 'development'},
  'dev-to-prod': {source: 'development', target: 'production'},
}

async function confirm(question) {
  const rl = readline.createInterface({input, output})
  try {
    const answer = await rl.question(question)
    return ['y', 'yes'].includes(answer.trim().toLowerCase())
  } finally {
    rl.close()
  }
}

function cleanup() {
  if (fs.existsSync(TMP_ARCHIVE)) {
    fs.unlinkSync(TMP_ARCHIVE)
  }
}

async function main() {
  const direction = process.argv[2]
  const mapping = DIRECTIONS[direction]

  if (!mapping) {
    console.error('Usage: node scripts/sync-dataset.mjs <prod-to-dev|dev-to-prod>')
    process.exit(1)
  }

  const {source, target} = mapping

  console.log('')
  console.log(`This will REPLACE all content in "${target}" with a copy of "${source}".`)
  if (target === 'production') {
    console.log('WARNING: You are about to overwrite the live production dataset.')
  }
  console.log('')

  const ok = await confirm('Continue? [y/N] ')
  if (!ok) {
    console.log('Aborted.')
    process.exit(0)
  }

  try {
    execSync(`sanity dataset export ${source} "${TMP_ARCHIVE}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    })
    execSync(`sanity dataset import "${TMP_ARCHIVE}" ${target} --replace`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    })
    console.log(`\nDone: ${source} → ${target}`)
  } finally {
    cleanup()
  }
}

main().catch((err) => {
  cleanup()
  console.error(err)
  process.exit(1)
})
