import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

export const runGh = async (args: string[]) => {
  const env = { ...process.env }
  // mise-backed gh wrappers can otherwise mix setup messages into JSON stdout.
  env.MISE_QUIET = '1'
  return execFileAsync('gh', args, { env })
}
