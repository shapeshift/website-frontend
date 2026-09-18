import chalk from 'chalk'
import * as semver from 'semver'
import { simpleGit as git } from 'simple-git'

export const exit = (reason?: string): boolean => Boolean(reason && console.log(reason)) || process.exit(0)

export type TReleaseKind = 'regular' | 'hotfix'

export const formatReleasePrTitle = (kind: TReleaseKind, version: string): string =>
  kind === 'hotfix' ? `chore: hotfix release ${version}` : `chore: release ${version}`

export const parseReleasePrTitle = (title: string): { kind: TReleaseKind; version: string } | undefined => {
  const hotfixMatch = /^chore: hotfix release (v\d+\.\d+\.\d+)$/.exec(title)
  if (hotfixMatch) return { kind: 'hotfix', version: hotfixMatch[1] }

  const regularMatch = /^chore: release (v\d+\.\d+\.\d+)$/.exec(title)
  if (regularMatch) return { kind: 'regular', version: regularMatch[1] }

  return undefined
}

export const getLatestSemverTag = async (): Promise<string> => {
  try {
    const tags = await git().tag(['-l', '--sort=-version:refname'])
    const semverTags = tags.split('\n').filter((tag) => semver.valid(tag.replace(/^v/, '')))

    if (semverTags.length === 0) {
      console.log(chalk.yellow('No semver tags found. Starting from v1.0.0'))
      return 'v1.0.0'
    }

    return semverTags[0]
  } catch {
    console.log(chalk.yellow('Could not get latest semver tag. Starting from v1.0.0'))
    return 'v1.0.0'
  }
}
