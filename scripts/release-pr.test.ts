import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { createDraftReleasePr } from './release-pr'

test('passes real newlines and literal shell characters to gh', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'release-pr-'))
  const originalPath = process.env.PATH
  try {
    // Capture the actual arguments received by gh without contacting GitHub.
    writeFileSync(
      join(directory, 'gh'),
      '#!/usr/bin/env python3\nimport json, sys\nprint(json.dumps(sys.argv[1:]))\n',
      {
        mode: 0o755,
      }
    )
    process.env.PATH = `${directory}:${originalPath}`
    const messages = ['fix: CMS (#115)', 'fix: "quoted" `literal` $(literal) $literal (#114)']
    const { stdout } = await createDraftReleasePr('chore: release v1.10.0', messages)
    assert.deepEqual(JSON.parse(stdout), [
      'pr',
      'create',
      '--draft',
      '--base',
      'main',
      '--title',
      'chore: release v1.10.0',
      '--body',
      'fix: CMS (#115)\nfix: "quoted" `literal` $(literal) $literal (#114)',
    ])
  } finally {
    process.env.PATH = originalPath
    rmSync(directory, { recursive: true, force: true })
  }
})
