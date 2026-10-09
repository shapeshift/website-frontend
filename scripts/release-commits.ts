import { simpleGit } from 'simple-git'

import type { SimpleGit } from 'simple-git'

export const getRegularReleaseCommits = async (
  client: SimpleGit = simpleGit(),
  from = 'origin/main',
  to = 'origin/develop'
): Promise<{ messages: string[]; total: number }> => {
  const [base, main] = await Promise.all([client.raw(['merge-base', from, to]), client.revparse([from])])

  if (base.trim() !== main.trim()) {
    throw new Error(
      `${from} is not an ancestor of ${to}. Merge ${from} into develop and push it before creating a regular release.`
    )
  }

  // Exclude old develop commits preceding the merge-back of the released main.
  const log = await client.raw([
    'log',
    '--first-parent',
    '--ancestry-path',
    '--format=%H%x09%P%x09%s',
    `${from}..${to}`,
  ])
  const messages: string[] = []
  const lines = log.trim().split('\n').filter(Boolean)

  if (lines.length) {
    const [hash, parents] = lines[lines.length - 1].split('\t')
    const firstParent = parents.split(' ')[0]
    const parentBase = await client.raw(['merge-base', from, firstParent])
    if (parentBase.trim() !== firstParent) {
      // An ancestry filter also hides unreleased work made before a merge-back.
      const [boundaryTree, mainTree] = await Promise.all([
        client.revparse([`${hash}^{tree}`]),
        client.revparse([`${from}^{tree}`]),
      ])
      if (boundaryTree.trim() !== mainTree.trim()) {
        throw new Error(
          'The main merge-back contains additional develop changes. Review the branch history before releasing; ancestry filtering could hide unreleased commits.'
        )
      }
    }
  }

  for (const line of lines) {
    const [hash, parents, ...subject] = line.split('\t')
    if (parents.split(' ').length > 1) {
      // Skip content-free merge-backs, but retain feature merges and conflict resolutions.
      const [before, after] = await Promise.all([
        client.revparse([`${hash}^1^{tree}`]),
        client.revparse([`${hash}^{tree}`]),
      ])
      if (before.trim() === after.trim()) continue
    }
    messages.push(subject.join('\t'))
  }

  return { messages, total: messages.length }
}
