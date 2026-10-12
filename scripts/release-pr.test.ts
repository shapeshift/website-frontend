import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { createDraftReleasePr, listOpenMainPrs } from './release-pr'

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

test('keeps mise wrapper output out of PR JSON and explains unexpected output', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'release-pr-json-'))
  const originalPath = process.env.PATH
  const originalQuiet = process.env.MISE_QUIET
  try {
    const prs = [{ title: 'chore: release v1.10.0', headRefName: 'release' }]
    writeFileSync(
      join(directory, 'gh'),
      `#!/usr/bin/env python3
import json, os, sys
assert sys.argv[1:] == ['pr', 'list', '--base', 'main', '--state', 'open', '--json', 'title,headRefName']
if os.environ.get('MISE_QUIET') != '1':
    print('mise setup output')
print(${JSON.stringify(JSON.stringify(prs))})
print('mise diagnostic on stderr', file=sys.stderr)
`,
      { mode: 0o755 }
    )
    process.env.PATH = `${directory}:${originalPath}`
    process.env.MISE_QUIET = '0'
    assert.deepEqual(await listOpenMainPrs(), prs)
    assert.equal(process.env.MISE_QUIET, '0')

    writeFileSync(join(directory, 'gh'), '#!/bin/sh\nprintf "mise unexpected output\\n[]\\n"\n', { mode: 0o755 })
    await assert.rejects(listOpenMainPrs(), /Could not parse JSON from gh pr list.*stderr/)

    writeFileSync(join(directory, 'gh'), '#!/bin/sh\nprintf "authentication failed\\n" >&2\nexit 1\n', {
      mode: 0o755,
    })
    await assert.rejects(listOpenMainPrs(), /authentication failed/)
  } finally {
    if (originalPath === undefined) delete process.env.PATH
    else process.env.PATH = originalPath
    if (originalQuiet === undefined) delete process.env.MISE_QUIET
    else process.env.MISE_QUIET = originalQuiet
    rmSync(directory, { recursive: true, force: true })
  }
})
