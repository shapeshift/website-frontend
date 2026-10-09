import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, test } from 'node:test'

import { simpleGit } from 'simple-git'

import { getRegularReleaseCommits } from './release-commits'

const directories: string[] = []

afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const fixture = () => {
  const directory = mkdtempSync(join(tmpdir(), 'website-release-'))
  directories.push(directory)
  const git = (...args: string[]) => execFileSync('git', args, { cwd: directory, stdio: 'pipe' }).toString().trim()
  const commit = (filename: string, content: string, message: string) => {
    writeFileSync(join(directory, filename), content)
    git('add', filename)
    git('commit', '-m', message)
  }
  git('init', '-b', 'main')
  git('config', 'user.name', 'Release test')
  git('config', 'user.email', 'release-test@example.com')
  git('config', 'commit.gpgsign', 'false')
  commit('base', 'base', 'initial')
  git('branch', 'develop')
  return { git, commit, client: simpleGit(directory) }
}

test('excludes a released duplicate and its content-free merge-back', async () => {
  const { git, commit, client } = fixture()
  git('checkout', 'develop')
  commit('onramper', 'fix', 'fix: Onramper (#113)')
  git('checkout', 'main')
  git('config', 'user.name', 'Release committer')
  commit('onramper', 'fix', 'fix: Onramper (#113)')
  git('checkout', 'develop')
  git('merge', '--no-ff', 'main', '-m', 'Merge main into develop')
  commit('deps', 'upgrade', 'fix: dependencies (#114)')
  commit('cms', 'published', 'fix: CMS (#115)')

  assert.deepEqual(await getRegularReleaseCommits(client, 'main', 'develop'), {
    messages: ['fix: CMS (#115)', 'fix: dependencies (#114)'],
    total: 2,
  })
})

test('rejects diverged main and develop instead of hiding pending changes', async () => {
  const { git, commit, client } = fixture()
  commit('hotfix', 'fix', 'hotfix on main')
  git('checkout', 'develop')
  commit('feature', 'feature', 'pending feature')

  await assert.rejects(getRegularReleaseCommits(client, 'main', 'develop'), /main is not an ancestor of develop/)
})

test('retains a feature merge that changes content', async () => {
  const { git, commit, client } = fixture()
  git('checkout', '-b', 'feature')
  commit('feature', 'feature', 'feature implementation')
  git('checkout', 'develop')
  git('merge', '--no-ff', 'feature', '-m', 'Merge feature PR')

  assert.deepEqual(await getRegularReleaseCommits(client, 'main', 'develop'), {
    messages: ['Merge feature PR'],
    total: 1,
  })
})

test('reports no pending changes when the branches match', async () => {
  const { client } = fixture()
  assert.deepEqual(await getRegularReleaseCommits(client, 'main', 'develop'), { messages: [], total: 0 })
})

test('rejects unreleased changes preceding the main merge-back', async () => {
  const { git, commit, client } = fixture()
  commit('hotfix', 'fix', 'hotfix on main')
  git('checkout', 'develop')
  commit('feature', 'feature', 'pending feature')
  git('merge', '--no-ff', 'main', '-m', 'Merge main into develop')
  commit('later', 'later', 'later change')

  await assert.rejects(
    getRegularReleaseCommits(client, 'main', 'develop'),
    /ancestry filtering could hide unreleased commits/
  )
})
