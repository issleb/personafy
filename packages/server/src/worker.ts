import type { Task } from 'graphile-worker'
import { run } from 'graphile-worker'
import { join, parse, resolve } from 'path'
import { promises as fs } from 'fs'

async function main() {
  try {
    const taskDirectory = resolve(__dirname, 'tasks')
    const taskFiles = await fs.readdir(taskDirectory)
    const taskList = Object.fromEntries(
      taskFiles
        .filter((file) => file.endsWith('.ts'))
        .map((taskFile) => [
          parse(taskFile).name,
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          require(join(taskDirectory, taskFile)) as Task,
        ])
    )

    const runner = await run({
      concurrency: 5,
      taskList: taskList,
    })

    await runner.promise
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main().catch((error: Error) => {
  console.error(error)
  process.exit(1)
})
