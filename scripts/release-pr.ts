import { runGh } from './release-gh'

export const createDraftReleasePr = async (title: string, messages: string[]) =>
  runGh(['pr', 'create', '--draft', '--base', 'main', '--title', title, '--body', messages.join('\n')])

export const listOpenMainPrs = async (): Promise<{ title: string; headRefName: string }[]> => {
  const { stdout } = await runGh(['pr', 'list', '--base', 'main', '--state', 'open', '--json', 'title,headRefName'])
  try {
    return JSON.parse(stdout)
  } catch {
    throw new Error(
      'Could not parse JSON from gh pr list. Ensure your gh wrapper writes setup messages to stderr instead of stdout.'
    )
  }
}
