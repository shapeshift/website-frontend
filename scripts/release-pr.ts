import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

export const createDraftReleasePr = async (title: string, messages: string[]) =>
  execFileAsync('gh', ['pr', 'create', '--draft', '--base', 'main', '--title', title, '--body', messages.join('\n')])
